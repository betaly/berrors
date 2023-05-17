/* eslint-disable @typescript-eslint/no-explicit-any */
import VError from 'verror';

import {BError} from '../../error';
import {fullStack} from '../../helpers';

describe('helpers/fullStack()', () => {
  describe('should have a resilient API which', () => {
    it('should handle being given nothing', () => {
      const result = fullStack(undefined as any);
      expect(result).toBeDefined();
      expect(result).toEqual('');
    });

    it('should handle being given null', () => {
      const result = fullStack(null);
      expect(result).toBeDefined();
      expect(result).toEqual('');
    });

    it('should handle an undefined stack attribute', () => {
      const err = new Error('foo');
      err.stack = undefined;

      const result = fullStack(err);
      expect(result).toBeDefined();
      expect(result).toEqual('');
    });
  });

  it('should return the stack trace', () => {
    const err = new Error('foo');
    err.stack = 'abc123';

    const result = fullStack(err);
    expect(result).toBeDefined();
    expect(result).toEqual('abc123');
  });

  it('should append causes to the stack trace', () => {
    const cause = new Error('foo');
    cause.stack = 'abc123';

    const err = new BError('foo', {cause});
    err.stack = 'xyz789';

    const result = fullStack(err);
    expect(result).toBeDefined();
    expect(result).toEqual('xyz789\nCaused by: abc123');
  });

  it('should append VError causes to the stack trace', () => {
    const cause1 = new Error('Foo');
    const cause2 = new BError('Abc', {cause: cause1});
    const cause3 = new VError(cause2, 'Bar');
    const err = new BError('Xyz', {cause: cause3});

    const result = fullStack(err);
    expect(result).toBeDefined();

    expect(result).toMatch(/^BError: Xyz\n\s+at/);
    expect(result).toMatch(/\nCaused by: VError: Bar: Abc\n/);
    expect(result).toMatch(/\nCaused by: BError: Abc\n/);
    expect(result).toMatch(/\nCaused by: Error: Foo\n/);
  });

  it('should not go infinite on circular error causes', () => {
    const cause = new BError('Foo');
    const err = new BError('Bar', {cause});

    cause.stack = 'abc123';
    err.stack = 'xyz789';

    (cause as any).cause = err;

    const result = fullStack(err);
    expect(result).toEqual('xyz789\nCaused by: abc123\nCaused by: xyz789\ncauses have become circular...');
  });
});
