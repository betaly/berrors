import isObject from 'tily/is/object';

import {setNonEnumProp} from './props';
import {validateError} from './validate';

/**
 * Ponyfills error.cause on older Node.js and browsers .
 * This must be called inside a class constructor, after super(message, parameters).
 * Example:
 *
 * class CustomError extends Error {
 *   constructor(message, parameters) {
 *     super(message, parameters)
 *     ponyfillCause(this, parameters)
 *   }
 * }
 *
 * try {
 *   throw new Error('innerMessage')
 * } catch (cause) {
 *   // Works on any platforms thanks to ponyfill
 *   const error = new CustomError('message', { cause })
 *   console.log(error.cause.message) // 'innerMessage'
 * }
 *
 * @param error
 * @param options
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ponyfillCause = (error: any, options?: {cause?: unknown}) => {
  validateError(error);

  if (hasCause(options) && !('cause' in error && options.cause === error.cause)) {
    setNonEnumProp(error, 'cause', options.cause);
  }
};

const hasCause = (options: unknown): options is {cause: unknown} =>
  isObject(options) && 'cause' in options && options.cause !== undefined;
