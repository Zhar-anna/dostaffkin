import { Component, inject, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService, Lang } from '../services/language.service';
import { HEADER_STRINGS } from './header.lang';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private langService = inject(LanguageService);

  // expose current language signal for template
  public lang = this.langService.lang;

  // current strings object; we keep as signal so that template updates
  public STR = signal(HEADER_STRINGS[this.lang()]);

  constructor() {
    // react to language changes
    effect(() => {
      const l: Lang = this.langService.lang();
      this.STR.set(HEADER_STRINGS[l]);
    });
  }

  toggleLanguage() {
    this.langService.toggleLang();
  }

  setLang(l: Lang) {
    this.langService.setLang(l);
  }
}
