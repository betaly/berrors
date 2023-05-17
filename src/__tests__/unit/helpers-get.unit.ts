/* eslint-disable @typescript-eslint/no-explicit-any */
import VError from 'verror';

import {BError} from '../../error';
import {getErrorCause} from '../../helpers';

class SubError extends Error {}

describe('helpers/getErrorCause()', () => {
  describe('should have a resilient API which', () => {
    it('should handle being given nothing', () => {
      const result = getErrorCause();
      expect(result).not.toBeTruthy();
    });

    it('should return nothing if given a non-error', () => {
      const result = getErrorCause(true as any);
      expect(result).not.toBeTruthy();
    });

    it('should return nothing if given null', () => {
      const result = getErrorCause(null as any);
      expect(result).not.toBeTruthy();
    });

    it('should return nothing if given a non-cause Error', () => {
      const result = getErrorCause(new Error('Foo'));
      expect(result).not.toBeTruthy();
    });
  });

  describe('with Error Cause input', () => {
    it('should return cause', () => {
      const cause = new SubError('Foo');
      const err = new BError('Bar', {cause});
      const result = getErrorCause(err);
      expect(result).toBeTruthy();
      expect(result).toEqual(cause);
    });

    it('should not return non-Error cause', () => {
      const err = new BError('Bar', {
        cause: '123',
      });
      const result = getErrorCause(err);
      expect(result).not.toBeTruthy();
    });
  });

  describe('with VError compatibility', () => {
    it('should return cause', () => {
      const cause = new SubError('Foo');
      const err = new VError(cause, 'Bar');
      const result = getErrorCause(err);
      expect(result).toBeTruthy();
      expect(result).toEqual(cause);
    });

    it('should not return non-Error cause', () => {
      const err = {
        cause() {
          return '123';
        },
      };
      const result = getErrorCause(err as any);
      expect(result).not.toBeTruthy();
    });
  });
});
