import {isConstructor} from 'tily/is/constructor';
import {Constructor} from 'tily/typings/types';

import {BError} from './error';

export namespace BErrors {
  export const Error = BError;
  export const BadRequest = BError.subclass('BadRequestError', 400, 'Bad Request Error', 'bad_request_error');
  export const Unauthorized = BError.subclass('UnauthorizedError', 401, 'Unauthorized Error', 'unauthorized_error');
  export const PaymentRequired = BError.subclass(
    'PaymentRequiredError',
    402,
    'Payment Required Error',
    'payment_required_error',
  );
  export const Forbidden = BError.subclass('ForbiddenError', 403, 'Forbidden Error', 'forbidden_error');
  export const NotFound = BError.subclass('NotFoundError', 404, 'Not Found Error', 'not_found_error');
  export const MethodNotAllowed = BError.subclass(
    'MethodNotAllowedError',
    405,
    'Method Not Allowed Error',
    'method_not_allowed_error',
  );
  export const NotAcceptable = BError.subclass(
    'NotAcceptableError',
    406,
    'Not Acceptable Error',
    'not_acceptable_error',
  );
  export const ProxyAuthenticationRequired = BError.subclass(
    'ProxyAuthenticationRequiredError',
    407,
    'Proxy Authentication Required Error',
    'proxy_authentication_required_error',
  );
  export const RequestTimeout = BError.subclass(
    'RequestTimeoutError',
    408,
    'Request Timeout Error',
    'request_timeout_error',
  );
  export const Conflict = BError.subclass('ConflictError', 409, 'Conflict Error', 'conflict_error');
  export const Gone = BError.subclass('GoneError', 410, 'Gone Error', 'gone_error');
  export const LengthRequired = BError.subclass(
    'LengthRequiredError',
    411,
    'Length Required Error',
    'length_required_error',
  );
  export const PreconditionFailed = BError.subclass(
    'PreconditionFailedError',
    412,
    'Precondition Failed Error',
    'precondition_failed_error',
  );
  export const PayloadTooLarge = BError.subclass(
    'PayloadTooLargeError',
    413,
    'Payload Too Large Error',
    'payload_too_large_error',
  );
  export const URITooLong = BError.subclass('URITooLongError', 414, 'URI Too Long Error', 'uri_too_long_error');
  export const UnsupportedMediaType = BError.subclass(
    'UnsupportedMediaTypeError',
    415,
    'Unsupported Media Type Error',
    'unsupported_media_type_error',
  );
  export const RangeNotSatisfiable = BError.subclass(
    'RangeNotSatisfiableError',
    416,
    'Range Not Satisfiable Error',
    'range_not_satisfiable_error',
  );
  export const ExpectationFailed = BError.subclass(
    'ExpectationFailedError',
    417,
    'Expectation Failed Error',
    'expectation_failed_error',
  );
  export const ImATeapot = BError.subclass('ImATeapotError', 418, "I'm a teapot Error", 'im_a_teapot_error');
  export const MisdirectedRequest = BError.subclass(
    'MisdirectedRequestError',
    421,
    'Misdirected Request Error',
    'misdirected_request_error',
  );
  export const UnprocessableEntity = BError.subclass(
    'UnprocessableEntityError',
    422,
    'Unprocessable Entity Error',
    'unprocessable_entity_error',
  );
  export const Locked = BError.subclass('LockedError', 423, 'Locked Error', 'locked_error');
  export const FailedDependency = BError.subclass(
    'FailedDependencyError',
    424,
    'Failed Dependency Error',
    'failed_dependency_error',
  );
  export const TooEarly = BError.subclass('TooEarlyError', 425, 'Too Early Error', 'too_early_error');
  export const UpgradeRequired = BError.subclass(
    'UpgradeRequiredError',
    426,
    'Upgrade Required Error',
    'upgrade_required_error',
  );
  export const PreconditionRequired = BError.subclass(
    'PreconditionRequiredError',
    428,
    'Precondition Required Error',
    'precondition_required_error',
  );
  export const TooManyRequests = BError.subclass(
    'TooManyRequestsError',
    429,
    'Too Many Requests Error',
    'too_many_requests_error',
  );
  export const RequestHeaderFieldsTooLarge = BError.subclass(
    'RequestHeaderFieldsTooLargeError',
    431,
    'Request Header Fields Too Large Error',
    'request_header_fields_too_large_error',
  );
  export const UnavailableForLegalReasons = BError.subclass(
    'UnavailableForLegalReasonsError',
    451,
    'Unavailable For Legal Reasons Error',
    'unavailable_for_legal_reasons_error',
  );
  export const InternalServerError = BError.subclass(
    'InternalServerError',
    500,
    'Internal Server Error',
    'internal_server_error',
  );
  export const NotImplemented = BError.subclass(
    'NotImplementedError',
    501,
    'Not Implemented Error',
    'not_implemented_error',
  );
  export const BadGateway = BError.subclass('BadGatewayError', 502, 'Bad Gateway Error', 'bad_gateway_error');
  export const ServiceUnavailable = BError.subclass(
    'ServiceUnavailableError',
    503,
    'Service Unavailable Error',
    'service_unavailable_error',
  );
  export const GatewayTimeout = BError.subclass(
    'GatewayTimeoutError',
    504,
    'Gateway Timeout Error',
    'gateway_timeout_error',
  );
  export const HTTPVersionNotSupported = BError.subclass(
    'HTTPVersionNotSupportedError',
    505,
    'HTTP Version Not Supported Error',
    'http_version_not_supported_error',
  );
  export const VariantAlsoNegotiates = BError.subclass(
    'VariantAlsoNegotiatesError',
    506,
    'Variant Also Negotiates Error',
    'variant_also_negotiates_error',
  );
  export const InsufficientStorage = BError.subclass(
    'InsufficientStorageError',
    507,
    'Insufficient Storage Error',
    'insufficient_storage_error',
  );
  export const LoopDetected = BError.subclass('LoopDetectedError', 508, 'Loop Detected Error', 'loop_detected_error');
  export const BandwidthLimitExceeded = BError.subclass(
    'BandwidthLimitExceededError',
    509,
    'Bandwidth Limit Exceeded Error',
    'bandwidth_limit_exceeded_error',
  );
  export const NotExtended = BError.subclass('NotExtendedError', 510, 'Not Extended Error', 'not_extended_error');
  export const NetworkAuthenticationRequired = BError.subclass(
    'NetworkAuthenticationRequiredError',
    511,
    'Network Authentication Required Error',
    'network_authentication_required_error',
  );

  export const ErrorByStatusCode: Record<number, Constructor<BError>> = {};

  Object.keys(BErrors).forEach(name => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e: Constructor<BError> = (BErrors as any)[name];
    if (isConstructor(e) && e.prototype.statusCode) {
      ErrorByStatusCode[e.prototype.statusCode] = e;
    }
  });
}
