import { Injectable, signal } from '@angular/core';

export type Lang = 'ru' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    private _lang = signal<Lang>(this.loadInitialLanguage());
    readonly lang = this._lang.asReadonly();

    private loadInitialLanguage(): Lang {
        const stored = localStorage.getItem('lang') as Lang | null;
        if (stored === 'ru' || stored === 'en') {
            return stored;
        }
        return this.detectBrowserLanguage();
    }

    private detectBrowserLanguage(): Lang {
        const navLang =
            (navigator.language || (navigator as any).userLanguage || 'ru').toLowerCase();
        return navLang.startsWith('en') ? 'en' : 'ru';
    }

    setLang(lang: Lang) {
        if (lang !== this._lang()) {
            this._lang.set(lang);
            localStorage.setItem('lang', lang);
        }
    }

    toggleLang() {
        this.setLang(this._lang() === 'ru' ? 'en' : 'ru');
    }
}
