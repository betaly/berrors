import {BErrors} from '../../errors';
import {fullStack} from '../../helpers';

describe('BErrors', function () {
  it('test error', function () {
    const notFound1 = new BErrors.NotFound('cloud not found');
    const notFound2 = new BErrors.NotFound('where is it?', {cause: notFound1});
    const stack = fullStack(new BErrors.Error('leaf error', {cause: notFound2}).setErrorCode('leaf_error'));
    expect(stack).toMatch(/^BError: leaf error\n/);
  });

  it('errorByStatusCode()', () => {
    expect(BErrors.ErrorByStatusCode[999]).toBeUndefined();
    expect(BErrors.ErrorByStatusCode[503]).toEqual(BErrors.ServiceUnavailable);
  });

  it('should have all required error constructors', () => {
    const AllErrors = [
      'BadRequest',
      'Unauthorized',
      'PaymentRequired',
      'Forbidden',
      'NotFound',
      'MethodNotAllowed',
      'NotAcceptable',
      'ProxyAuthenticationRequired',
      'RequestTimeout',
      'Conflict',
      'Gone',
      'LengthRequired',
      'PreconditionFailed',
      'PayloadTooLarge',
      'URITooLong',
      'UnsupportedMediaType',
      'RangeNotSatisfiable',
      'ExpectationFailed',
      'ImATeapot',
      'MisdirectedRequest',
      'UnprocessableEntity',
      'Locked',
      'FailedDependency',
      'TooEarly',
      'UpgradeRequired',
      'PreconditionRequired',
      'TooManyRequests',
      'RequestHeaderFieldsTooLarge',
      'UnavailableForLegalReasons',
      'InternalServerError',
      'NotImplemented',
      'BadGateway',
      'ServiceUnavailable',
      'GatewayTimeout',
      'HTTPVersionNotSupported',
      'VariantAlsoNegotiates',
      'InsufficientStorage',
      'LoopDetected',
      'BandwidthLimitExceeded',
      'NotExtended',
      'NetworkAuthenticationRequired',
    ] as const;

    AllErrors.forEach(errorName => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(BErrors[errorName]).toBeTruthy();
    });
  });
});
