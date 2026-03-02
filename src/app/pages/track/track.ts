import { Component, inject, signal } from '@angular/core';
import { Header } from '../../header/header';
import { FormsModule } from '@angular/forms';
import { DeliveryApi } from '../../services/delivery-api';
import { ToastrService } from 'ngx-toastr';

import { TRACK_STRINGS } from './track.lang';

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
  public STR = TRACK_STRINGS;

  constructor(private deliveryApi: DeliveryApi) { }

  trackShipment(): void {
    const rawValue = this.trackNumber.trim();

    if (!rawValue) {
      this.toastr.error(this.STR.errorEmpty);
      return;
    }

    this.trackResult.set(null);
    const numericValue = Number(rawValue);
    if (Number.isNaN(numericValue) || numericValue <= 0) {
      this.toastr.error(this.STR.errorInvalid);
      return;
    }

    this.deliveryApi.getDeliveryInfo(numericValue).subscribe((response) => {
      if ('error' in response) {
        this.toastr.error(response.error);
        return;
      }
      this.toastr.success(this.STR.successLoaded);
      this.trackResult.set(response);
    });
  }
}
