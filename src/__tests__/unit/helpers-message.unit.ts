/* eslint-disable @typescript-eslint/no-explicit-any */
import VError from 'verror';

import {BError} from '../../error';
import {fullMessage} from '../../helpers';

describe('helpers/fullMessage()', () => {
  describe('should have a resilient API which', () => {
    it('should handle being given nothing', () => {
      const result = fullMessage(undefined as any);
      expect(result).toBeDefined();
      expect(result).toEqual('');
    });

    it('should handle being given null', () => {
      const result = fullMessage(null as any);
      expect(result).toBeDefined();
      expect(result).toEqual('');
    });

    it('should handle an undefined message attribute', () => {
      const err = new Error('foo');
      (err as any).message = undefined;

      const result = fullMessage(err);
      expect(result).toBeDefined();
      expect(result).toEqual('');
    });
  });

  it('should return the message', () => {
    const err = new Error('Foo');
    const result = fullMessage(err);
    expect(result).toBeDefined();
    expect(result).toEqual('Foo');
  });

  it('should append causes to the message', () => {
    const cause = new Error('Foo');
    const err = new BError('Bar', {cause});
    const result = fullMessage(err);
    expect(result).toBeDefined();
    expect(result).toEqual('Bar: Foo');
  });

  it('should append VError causes to the message', () => {
    const cause1 = new Error('Foo');
    const cause2 = new BError('Abc', {cause: cause1});
    const cause3 = new VError(cause2, 'Bar');
    const err = new BError('Xyz', {cause: cause3});

    const result = fullMessage(err);
    expect(result).toBeDefined();
    expect(result).toEqual('Xyz: Bar: Abc: Foo');
  });

  it('should not go infinite on circular error causes', () => {
    const cause = new BError('Foo');
    const err = new BError('Bar', {cause});

    (cause as any).cause = err;

    const result = fullMessage(err);
    expect(result).toEqual('Bar: Foo: Bar: ...');
  });
});
