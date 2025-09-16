import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'ru' | 'zh';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

/**
 * Service for managing application language/locale
 * Supports English, Russian, and Chinese
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'app_language';

  // Available languages configuration
  private readonly languageConfigs: Record<Language, LanguageConfig> = {
    en: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
    },
    ru: {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
    },
    zh: {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
    },
  };

  // Current language signal
  private readonly currentLanguage = signal<Language>('en');

  // Expose language as readonly signal
  readonly language = this.currentLanguage.asReadonly();

  // Expose available languages
  readonly availableLanguages = Object.values(this.languageConfigs);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    // Load saved language from localStorage (browser only)
    if (this.isBrowser) {
      this.loadLanguageFromStorage();
    }

    // Apply language changes (browser only)
    if (this.isBrowser) {
      effect(() => {
        this.applyLanguageToDocument(this.currentLanguage());
      });
    }
  }

  /**
   * Get configuration for a specific language
   */
  getLanguageConfig(languageCode: Language): LanguageConfig {
    return this.languageConfigs[languageCode];
  }

  /**
   * Get configuration for the current language
   */
  getCurrentLanguageConfig(): LanguageConfig {
    return this.languageConfigs[this.currentLanguage()];
  }

  /**
   * Set the current language
   */
  setLanguage(languageCode: Language): void {
    if (this.languageConfigs[languageCode]) {
      this.currentLanguage.set(languageCode);
      this.saveLanguageToStorage(languageCode);
    } else {
      console.warn('Invalid language code:', languageCode);
    }
  }

  /**
   * Load language from localStorage (browser only)
   */
  private loadLanguageFromStorage(): void {
    if (!this.isBrowser) return;

    try {
      const savedLanguage = localStorage.getItem(this.STORAGE_KEY) as Language;
      if (savedLanguage && this.languageConfigs[savedLanguage]) {
        this.currentLanguage.set(savedLanguage);
      }
    } catch (error) {
      console.warn('Failed to load language from localStorage:', error);
    }
  }

  /**
   * Save language to localStorage (browser only)
   */
  private saveLanguageToStorage(languageCode: Language): void {
    if (!this.isBrowser) return;

    try {
      localStorage.setItem(this.STORAGE_KEY, languageCode);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  }

  /**
   * Apply language to document (browser only)
   */
  private applyLanguageToDocument(languageCode: Language): void {
    if (!this.isBrowser) return;

    // Set document language attribute
    document.documentElement.lang = languageCode;
  }

  /**
   * Get localized messages based on current language
   * Note: In a full implementation, this would integrate with @angular/localize
   * For now, we'll provide basic translations
   */
  getLocalizedMessage(key: string): string {
    const messages: Record<Language, Record<string, string>> = {
      en: {
        'hello.choose.theme': 'Hello. Choose a theme.',
        'text.placeholder': 'Enter your text here...',
        language: 'Language',
      },
      ru: {
        'hello.choose.theme': 'Привет. Выберите тему.',
        'text.placeholder': 'Введите текст здесь...',
        language: 'Язык',
      },
      zh: {
        'hello.choose.theme': '你好。选择一个主题。',
        'text.placeholder': '在这里输入您的文本...',
        language: '语言',
      },
    };

    return messages[this.currentLanguage()]?.[key] || key;
  }
}
