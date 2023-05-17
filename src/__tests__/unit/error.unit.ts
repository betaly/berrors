import {BError} from '../../error';

describe('BError', function () {
  it('should set cause when provided', () => {
    const cause = new Error('Bar');
    const err = new BError('Foo', {cause});

    expect(err).toHaveProperty('cause', cause);
    expect(err).toHaveProperty('message', 'Foo');
  });

  it('should handle missing options object', () => {
    const err = new BError('Foo');

    expect(err).not.toHaveProperty('cause');
    expect(err).toHaveProperty('message', 'Foo');
  });

  it('should produce a proper stack trace', () => {
    const err = new BError('Foo');
    expect(err).toHaveProperty('stack');
    expect(err.stack).toMatch(/^BError: Foo\n/);
  });

  describe('subclass', function () {
    it('should inherit from BError', function () {
      const TestError = BError.subclass('TestError', 500, 'Test error message', 'test_error');
      const err = new TestError('Test error message 2').setErrorCode('test_error2');
      expect(err).toBeInstanceOf(TestError);
      expect(err).toBeInstanceOf(BError);
      expect(err.name).toBe('TestError');
      expect(err.message).toBe('Test error message 2');
      expect(err.statusCode).toBe(500);
      expect(err.errorCode).toBe('test_error2');
    });
  });
});
