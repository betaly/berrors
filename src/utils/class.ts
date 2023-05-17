import isObject from 'tily/is/object';

import {validateError} from './validate';

/**
 * Some `Error` polyfills (such as
 * [`es-shims/error-cause`](https://github.com/es-shims/error-cause)) prevent
 * extending from it. This fixes it.
 *
 * The second argument must be
 * [`new.target`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target).
 * This must be called directly inside a class constructor, after
 * [`super(message, parameters)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super).
 *
 * @example
 * ```js
 * class CustomError extends Error {
 *   constructor(message, parameters) {
 *     super(message, parameters)
 *     ensureCorrectClass(this, new.target)
 *   }
 * }
 *
 * // Thanks to `ensureCorrectClass()`, this is now always true even when
 * // `Error` has been polyfilled
 * console.log(new CustomError('message') instanceof CustomError) // true
 * ```
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ensureCorrectClass = (error: any, newTarget: any) => {
  validateError(error);
  validateNewTarget(newTarget);

  const newTargetProto = newTarget.prototype;

  if (Object.getPrototypeOf(error) !== newTargetProto) {
    Object.setPrototypeOf(error, newTargetProto);
  }

  if (typeof newTargetProto.constructor === 'function' && error.constructor !== newTargetProto.constructor) {
    delete error.constructor;
  }
};

const validateNewTarget = (x: unknown) => {
  if (x === undefined) {
    throw new TypeError("This must be called directly inside the class's constructor.");
  }

  if (typeof x !== 'function' || !isObject(x.prototype)) {
    throw new TypeError('The second argument must be `new.target`.');
  }
};
