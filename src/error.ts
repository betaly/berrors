import isEmpty from 'tily/is/empty';
import {AnyObj} from 'tily/typings/types';
import {inspect} from 'util';

import {fullStack} from './helpers';
import {ErrorName} from './types';
import {errorCustomClass, setErrorName} from './utils';

export interface ErrorOptions {
  statusCode?: number;
  errorCode?: string;
  data?: AnyObj;
  cause?: unknown;
}

export class BError extends errorCustomClass('BError') {
  statusCode?: number;
  errorCode?: string;
  data?: AnyObj;

  constructor(message?: string, options: ErrorOptions = {}) {
    super(message, {cause: options.cause});

    if (!isEmpty(options.statusCode)) {
      this.statusCode = options.statusCode;
    }

    if (!isEmpty(options.errorCode)) {
      this.errorCode = options.errorCode;
    }

    if (!isEmpty(options.data)) {
      this.data = options.data;
    }
  }

  static subclass(className: ErrorName, statusCode?: number, defaultMessage?: string, errorCode?: string) {
    const ErrorClass = class extends this {};

    setErrorName(ErrorClass, className);

    if (statusCode) {
      ErrorClass.prototype.statusCode = statusCode;
    }

    if (errorCode) {
      ErrorClass.prototype.errorCode = errorCode;
    }

    if (defaultMessage) {
      ErrorClass.prototype.message = defaultMessage;
    }

    return ErrorClass;
  }

  [inspect.custom || /* istanbul ignore next */ 'inspect']() {
    return fullStack(this);
  }

  setErrorCode(errorCode?: string) {
    this.errorCode = errorCode;
    return this;
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setStatusCode(statusCode?: number) {
    this.statusCode = statusCode;
    return this;
  }

  setData(data: AnyObj) {
    this.data = data;
    return this;
  }
}
