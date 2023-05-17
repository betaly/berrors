import {ErrorConstructor, ErrorName} from '../types';
import {setNonEnumProp} from './props';

/**
 * Set an `ErrorClass`'s
 * [`name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name).
 *
 * This must be performed on an error class, not instance. Unlike setting
 * `this.name = '...'` inside an error's constructor, this follows the native
 * `Error` classes' pattern where `error.name`:
 *
 *  - Ends with the `Error` suffix
 *  - Matches the
 *    [constructor's `name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name)
 *  - Is
 *    [inherited](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
 *  - Is
 *    [non-enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
 *
 * @example
 * ```js
 * class CustomError extends Error {}
 * setErrorName(CustomError, 'CustomError')
 *
 * console.log(CustomError.name) // 'CustomError'
 * console.log(CustomError.prototype.name) // 'CustomError'
 *
 * const error = new CustomError('message')
 * console.log(error.name) // 'CustomError'
 * console.log(Object.keys(error).includes('name')) // false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function setErrorName(ErrorClass: ErrorConstructor, name: ErrorName): void {
  validateErrorName(name);
  setNonEnumProp(ErrorClass, 'name', name);
  setNonEnumProp(ErrorClass.prototype, 'name', name);
}

const validateErrorName = (name: unknown) => {
  if (typeof name !== 'string') {
    throw new TypeError(`Error name must be a string: ${name}`);
  }

  validateNativeErrors(name);

  if (!name.endsWith(ERROR_NAME_END) || name === ERROR_NAME_END) {
    throw new Error(`Error name "${name}" must end with "${ERROR_NAME_END}"`);
  }

  validateErrorNamePattern(name);
};

const validateNativeErrors = (errorName: string) => {
  if (NATIVE_ERRORS.has(errorName)) {
    throw new Error(`Error name "${errorName}" must not be a native class.`);
  }
};

const NATIVE_ERRORS = new Set([
  'Error',
  'ReferenceError',
  'TypeError',
  'SyntaxError',
  'RangeError',
  'URIError',
  'EvalError',
  'AggregateError',

  'SystemError',
  'AssertionError',
  'Warning',
  'UnhandledPromiseRejection',

  'DOMException',
]);

const validateErrorNamePattern = (errorName: string) => {
  if (errorName[0] !== errorName.toUpperCase()[0]) {
    throw new Error(`Error name "${errorName}" must start with an uppercase letter.`);
  }

  if (!ERROR_NAME_REGEXP.test(errorName)) {
    throw new Error(`Error name "${errorName}" must only contain letters.`);
  }
};

const ERROR_NAME_END = 'Error';
const ERROR_NAME_REGEXP = /[A-Z][a-zA-Z]*Error$/u;
