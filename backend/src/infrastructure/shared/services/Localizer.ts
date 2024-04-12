import i18n from 'i18next';
import { ILocalizer } from '/src/contracts/services/ILocaizer'

export class Localizer implements ILocalizer {
  getCurrentLocale(): void {
      throw new Error('Method not implemented.');
  }
  getLocales(): ['ar', 'en'] {
      throw new Error('Method not implemented.');
  }
  t(key: string, options?: any): string {
    return i18n.t(key, options);
  }
}