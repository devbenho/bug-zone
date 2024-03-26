import {
  ValidationError
} from '@/contracts/exceptions/validation-error/validation.error';

import i18n from './localizer';

class RequiredValidationError<T> extends ValidationError {
  constructor(request: T, message: string) {
    const fieldNames = Object.keys(request as any).filter(k => request[k] === undefined)


    const fieldName = Object.keys(request)[0];
    const message = i18n.t('requiredFieldError', { field: fieldName });
    super(message);

  }
}


export { RequiredValidationError }