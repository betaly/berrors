/* eslint-disable @typescript-eslint/no-explicit-any */
import VError from 'verror';

import {BError} from '../../error';
import {findCauseByReference} from '../../helpers';

class SubError extends Error {}

describe('helpers/findCauseByReference()', function () {
  describe('should have a resilient API which', () => {
    it('should handle being given nothing', () => {
      const result = findCauseByReference();
      expect(result).not.toBeTruthy();
    });

    it('should handle being given only an error', () => {
      const result = findCauseByReference(new Error('Yay'));
      expect(result).not.toBeTruthy();
    });

    it('should return nothing if given a non-error', () => {
      const result = findCauseByReference(true, true as any);
      expect(result).not.toBeTruthy();
    });

    it('should return nothing if given null', () => {
      const result = findCauseByReference(null, null as any);
      expect(result).not.toBeTruthy();
    });

    it('should return nothing if given a non-error reference', () => {
      const result = findCauseByReference(new Error('yay'), true as any);
      expect(result).not.toBeTruthy();
    });

    it('should return nothing if given a non-Error constructor as reference', () => {
      class Foo {}
      const result = findCauseByReference(new Error('yay'), Foo);
      expect(result).not.toBeTruthy();
    });
  });

  it('should return input if its an instance of reference', () => {
    const err = new SubError('Foo');
    const result = findCauseByReference(err, SubError);
    expect(result).toBeTruthy();
    expect(result).toEqual(err);
  });

  it('should return input if its an instance of a parent of reference', () => {
    const err = new SubError('Foo');
    const result = findCauseByReference(err, Error);
    expect(result).toBeTruthy();
    expect(result).toEqual(err);
  });

  it('should not return input if its not an instance of reference', () => {
    const err = new Error('Foo');
    const result = findCauseByReference(err, SubError);
    expect(result).not.toBeTruthy();
  });

  it('should return input cause if its an instance of reference', () => {
    const cause = new SubError('Foo');
    const err = new BError('Bar', {cause});
    const result = findCauseByReference(err, SubError);
    expect(result).toBeTruthy();
    expect(result).toEqual(cause);
  });

  it('should return input VError cause if its an instance of reference', () => {
    const cause = new SubError('Foo');
    const err = new VError(cause, 'Bar');
    const result = findCauseByReference(err, SubError);
    expect(result).toBeTruthy();
    expect(result).toEqual(cause);
  });

  it('should not go infinite on circular error causes', () => {
    const cause = new BError('Foo');
    const err = new BError('Bar', {cause});

    (cause as any).cause = err;

    const result = findCauseByReference(err, SubError);
    expect(result).not.toBeTruthy();
  });
});
