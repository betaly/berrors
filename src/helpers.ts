/**
 * borrowed from https://github.com/voxpelli/pony-cause/blob/main/lib/helpers.js
 */
import {Constructor} from 'tily/typings/types';

/**
 * @template {Error} T
 * @param {unknown} err
 * @param {new(...args: any[]) => T} reference
 * @returns {T|undefined}
 */
export const findCauseByReference = (err?: unknown, reference?: Constructor) => {
  if (!err || !reference) return;
  if (!(err instanceof Error)) return;
  if (!(reference.prototype instanceof Error) && reference !== Error) return;

  /**
   * Ensures we don't go circular
   *
   * @type {Set<Error>}
   */
  const seen = new Set();

  /** @type {Error|undefined} */
  let currentErr: Error | undefined = err;

  while (currentErr && !seen.has(currentErr)) {
    seen.add(currentErr);

    if (currentErr instanceof reference) {
      return currentErr;
    }

    currentErr = getErrorCause(currentErr);
  }
};

/**
 * @param {Error|{ cause?: unknown|(()=>err)}} err
 * @returns {Error|undefined}
 */
export const getErrorCause = (err?: Error) => {
  if (!err || typeof err !== 'object' || !('cause' in err)) {
    return;
  }

  // VError / NError style causes
  if (typeof err.cause === 'function') {
    const causeResult = err.cause();

    return causeResult instanceof Error ? causeResult : undefined;
  } else {
    return err.cause instanceof Error ? err.cause : undefined;
  }
};

/**
 * Internal method that keeps a track of which error we have already added, to avoid circular recursion
 *
 * @private
 * @param {Error} err
 * @param {Set<Error>} seen
 * @returns {string}
 */
const doFullStack = (err: unknown, seen: Set<Error>): string => {
  if (!(err instanceof Error)) return '';

  const stack = err.stack || '';

  // Ensure we don't go circular or crazily deep
  if (seen.has(err)) {
    return stack + '\ncauses have become circular...';
  }

  const cause = getErrorCause(err);

  // TODO: Follow up in https://github.com/nodejs/node/issues/38725#issuecomment-920309092 on how to log stuff

  if (cause) {
    seen.add(err);
    return stack + '\nCaused by: ' + doFullStack(cause, seen);
  } else {
    return stack;
  }
};

/**
 * @param {Error} err
 * @returns {string}
 */
export const fullStack = (err: unknown) => doFullStack(err, new Set());

/**
 * Internal method that keeps a track of which error we have already added, to avoid circular recursion
 *
 * @private
 * @param {Error} err
 * @param {Set<Error>} seen
 * @param {boolean} [skip]
 * @returns {string}
 */
const doFullMessage = (err: unknown, seen: Set<Error>, skip?: boolean): string => {
  if (!(err instanceof Error)) return '';

  const message = skip ? '' : err.message || '';

  // Ensure we don't go circular or crazily deep
  if (seen.has(err)) {
    return message + ': ...';
  }

  const cause = getErrorCause(err);

  if (cause) {
    seen.add(err);

    const skipIfVErrorStyleCause = 'cause' in err && typeof err.cause === 'function';

    return message + (skipIfVErrorStyleCause ? '' : ': ') + doFullMessage(cause, seen, skipIfVErrorStyleCause);
  } else {
    return message;
  }
};

/**
 * @param {Error} err
 * @returns {string}
 */
export const fullMessage = (err: Error) => doFullMessage(err, new Set());
