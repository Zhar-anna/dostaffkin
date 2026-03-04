import { Component, inject, signal, effect } from '@angular/core';
import { Header } from '../../header/header';
import { FormsModule } from '@angular/forms';
import { DeliveryApi } from '../../services/delivery-api';
import { ToastrService } from 'ngx-toastr';
import { TRACK_STRINGS } from './track.lang';
import { LanguageService, Lang } from '../../services/language.service';

@Component({
  selector: 'app-track',
  imports: [Header, FormsModule],
  templateUrl: './track.html',
  styleUrl: './track.css',
})

export class Track {
  trackNumber = '';
  trackResult: any = signal(null);
  toastr = inject(ToastrService);
  private langService = inject(LanguageService);
  public STR = signal(TRACK_STRINGS['ru']);

  constructor(private deliveryApi: DeliveryApi) {
    effect(() => {
      const l: Lang = this.langService.lang();
      this.STR.set(TRACK_STRINGS[l]);
    });
  }

  trackShipment(): void {
    const rawValue = this.trackNumber.trim();

    if (!rawValue) {
      this.toastr.error(this.STR().errorEmpty);
      return;
    }

    this.trackResult.set(null);
    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue) || numericValue <= 0) {
      this.toastr.error(this.STR().errorInvalid);
      return;
    }

    this.deliveryApi.getDeliveryInfo(numericValue).subscribe((response) => {
      if ('error' in response) {
        this.toastr.error(response.error);
        return;
      }
      this.toastr.success(this.STR().successLoaded);
      this.trackResult.set(response);
    });
  }
}
