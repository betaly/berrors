# berrors

> Common error builder utility for Node.js. Contains common error types, and helpers for stack trace tracking to support
> more detailed error messages.

## Usage

### Install from NPM

npm

```shell
$ npm install --save berrors
```

yarn

```shell
$ yarn add berrors
```

### Require and use the module

```ts
import {BErrors} from 'berrors';

new BErrors.NotFound('could not find it');
```

## API

The API is designed to be daisy chained with all of the following base commands that are a part of all of the error
types.

### BError Commands

#### new BError(message, options) -> instance

Creates an instance of a BError for the type used.

```ts
try {
  // ...
} catch (err) {
  new BError('Some error', {cause: err});
}
```

Options:

- `cause?` - The cause of the error. Can be a string, Error, or BError.
- `statusCode?` - The HTTP status code to be used by error handlers.
- `errorCode?` - The error code to be used by error handlers.
- `data?` - Additional data to be used by error handlers.

#### .setErrorCode(errorCode) -> instance

Sets an error code to later be used by error handlers.

```ts
new BError('Not found').setErrorCode('leaf_error');
```

#### .setMessage(message) -> instance

Overrides the error message passed in.

```ts
new BError('Not found').setMessage('Unable to find the restaurant.');
```

#### .setStatusCode(statusCode) -> instance

Setting the response status code to be sent back down to the client.

```ts
new BError('Not found').setStatusCode(404);
```

#### .setData(data) -> instance

Sets customizable data that can be used down the error stack chain.

```ts
new BError('Not found').setData({foo: 'bar'});
```

## Properties

| Property     | Description            |
| :----------- | :--------------------- |
| `message`    | The error message.     |
| `name`       | The error name.        |
| `stack`      | The error stack trace. |
| `cause`      | The error cause.       |
| `statusCode` | The error status code. |
| `errorCode`  | The error code.        |
| `data`       | The error data.        |

## Error Types

| Error Type                      | Status Code | Error Code                      | Message                               |
| :------------------------------ | :---------- | :------------------------------ | :------------------------------------ |
| `BadRequest`                    | 400         | bad_request                     | Bad Request Erro                      |
| `Unauthorized`                  | 401         | unauthorized                    | Unauthorized Error                    |
| `PaymentRequired`               | 402         | payment_required                | Payment Required Error                |
| `Forbidden`                     | 403         | forbidden                       | Forbidden Error                       |
| `NotFound`                      | 404         | not_found                       | Not Found Error                       |
| `MethodNotAllowed`              | 405         | method_not_allowed              | Method Not Allowed Error              |
| `NotAcceptable`                 | 406         | not_acceptable                  | Not Acceptable Error                  |
| `ProxyAuthenticationRequired`   | 407         | proxy_authentication_required   | Proxy Authentication Required Error   |
| `RequestTimeout`                | 408         | request_timeout                 | Request Timeout Error                 |
| `Conflict`                      | 409         | conflict                        | Conflict Error                        |
| `Gone`                          | 410         | gone                            | Gone Error                            |
| `LengthRequired`                | 411         | length_required                 | Length Required Error                 |
| `PreconditionFailed`            | 412         | precondition_failed             | Precondition Failed Error             |
| `PayloadTooLarge`               | 413         | payload_too_large               | Payload Too Large Error               |
| `URITooLong`                    | 414         | uri_too_long                    | URI Too Long Error                    |
| `UnsupportedMediaType`          | 415         | unsupported_media_type          | Unsupported Media Type Error          |
| `RangeNotSatisfiable`           | 416         | range_not_satisfiable           | Range Not Satisfiable Error           |
| `ExpectationFailed`             | 417         | expectation_failed              | Expectation Failed Error              |
| `ImATeapot`                     | 418         | im_a_teapot                     | I'm a teapot Error                    |
| `MisdirectedRequest`            | 421         | misdirected_request             | Misdirected Request Error             |
| `UnprocessableEntity`           | 422         | unprocessable_entity            | Unprocessable Entity Error            |
| `Locked`                        | 423         | locked                          | Locked Error                          |
| `FailedDependency`              | 424         | failed_dependency               | Failed Dependency Error               |
| `TooEarly`                      | 425         | too_early                       | Too Early Error                       |
| `UpgradeRequired`               | 426         | upgrade_required                | Upgrade Required Error                |
| `PreconditionRequired`          | 428         | precondition_required           | Precondition Required Error           |
| `TooManyRequests`               | 429         | too_many_requests               | Too Many Requests Error               |
| `RequestHeaderFieldsTooLarge`   | 431         | request_header_fields_too_large | Request Header Fields Too Large Error |
| `UnavailableForLegalReasons`    | 451         | unavailable_for_legal_reasons   | Unavailable For Legal Reasons Error   |
| `InternalServerError`           | 500         | internal_server_error           | Internal Server Error                 |
| `NotImplemented`                | 501         | not_implemented                 | Not Implemented Error                 |
| `BadGateway`                    | 502         | bad_gateway                     | Bad Gateway Error                     |
| `ServiceUnavailable`            | 503         | service_unavailable             | Service Unavailable Error             |
| `GatewayTimeout`                | 504         | gateway_timeout                 | Gateway Timeout Error                 |
| `HTTPVersionNotSupported`       | 505         | http_version_not_supported      | HTTP Version Not Supported Error      |
| `VariantAlsoNegotiates`         | 506         | variant_also_negotiates         | Variant Also Negotiates Error         |
| `InsufficientStorage`           | 507         | insufficient_storage            | Insufficient Storage Error            |
| `LoopDetected`                  | 508         | loop_detected                   | Loop Detected Error                   |
| `NotExtended`                   | 510         | not_extended                    | Not Extended Error                    |
| `NetworkAuthenticationRequired` | 511         | network_authentication_required | Network Authentication Required Error |

### Error Type Examples

```ts
BErrors.BadRequest('Invalid input');
// => BadRequestError { name: 'BadRequestError', message: 'Invalid input', statusCode: 400, errorCode: 'bad_request' }
```

## Helpers for working with error causes

- [`findCauseByReference`](#findcausebyreference) - finding an error of a specific type within the cause chain
- [`getErrorCause`](#geterrorcause) - getting the direct cause of an error, if there is any
- [`fullMessage`](#fullmessage) - gets the error message with the messages of its cause chain appended to it
- [`fullStafck`](#fullstack) - gets a stack trace for the error + all its causes

### findCauseByReference

Finding an error of a specific type within the cause chain. Is typescript friendly.

```ts
import {findCauseByReference} from 'berrors/helpers';

try {
  /* Something that can break */
} catch (err) {
  /** @type {MySpecialError} */
  const specialErr = findCauseByReference(err, MySpecialError);

  if (specialErr && specialErr.specialProperty === 'specialValue') {
    // Its okay, chill!
  } else {
    throw err;
  }
}
```

Used to find a specific type of error in the chain of causes in an error.

Similar to [`VError.findCauseByName`](https://github.com/TritonDataCenter/node-verror#verrorfindcausebynameerr-name) but
resolves causes in both [Error Causes](https://github.com/tc39/proposal-error-cause) style, `.cause`, and
[VError](https://github.com/TritonDataCenter/node-verror) style, `.cause()` + takes a reference to the Error class that
you are looking for rather than simply the name of it, as that enables the TypeScript types to properly type the
returned error, typing it with the same type as the reference.

Can be useful if there's some extra data on it that can help determine whether it's an unexpected error or an error that
can be handled.

If it's an error related to a HTTP request, then maybe the request can be retried? If its a database error that tells
you about a duplicated row, then maybe you know how to work with that? Maybe forward that error to the user rather than
show a `500` error?

_Note:_ [`findCauseByReference`](#findcausebyreference) has protection against circular causes

### getErrorCause

Getting the direct cause of an error, if there is any. Is typescript friendly.

```ts
import {getErrorCause} from 'berrors/helpers';

try {
  /* Something that can break */
} catch (err) {
  // Returns the Error cause, BError cause or undefined
  const cause = getErrorCause(err);
}
```

The output is similar to [`VError.cause()`](https://github.com/TritonDataCenter/node-verror#verrorcauseerr) but resolves
causes in both [Error Causes](https://github.com/tc39/proposal-error-cause) style, `.cause`, and
[VError](https://github.com/TritonDataCenter/node-verror) style, `.cause()`.

Always return an `Error`, a subclass of `Error` or `undefined`. If a cause in
[Error Causes](https://github.com/tc39/proposal-error-cause) style cause is not an `Error` or a subclass of `Error`, it
will be ignored and `undefined` will be returned.

### fullMessage

Gets the error message with the messages of its cause chain appended to it.

```ts
import {BError, fullMessage} from 'berrors';

try {
  try {
    // First error...
    throw new Error('First error');
  } catch (err) {
    // ...that's caught and wrapped in a second error
    throw new BError('Second error', {cause: err});
  }
} catch (err) {
  // Logs the full message trail: "Second error: First error"
  console.log(fullMessage(err));
}
```

The output is similar to the standard `VError` behaviour of
[appending `message` with the `cause.message`](https://github.com/TritonDataCenter/node-verror#public-properties),
separating the two with a `: `.

Since [Error Causes](https://github.com/tc39/proposal-error-cause) doesn't do this, [`fullMessage`](#fullmessage) exist
to mimic that behaviour.

It respects `VError` messages, it won't append any error message of their causes, though it will walk past the `VError`
causes to see if there's a non-VError cause up the chain and then append that.

The reason to use this method is explained by `VError`:

> The idea is that each layer in the stack annotates the error with a description of what it was doing. The end result
> is a message that explains what happened at each level.

If an inner error has a message `ENOENT, stat '/nonexistent'`, an outer error wraps it and adds `Can't perform X` and
maybe one more error wraps that and adds `Can't start program`, then [`fullMessage`](#fullmessage) will join those three
errors together when providing it with the outer most error and return
`Can't start program: Can't perform X: ENOENT, stat '/nonexistent'` which provides details about both cause and effect
as well as the connection between the two – each which on their own would be a lot harder to understand the impact of.

_Note:_ [`fullMessage`](#fullMessage) has protection against circular causes

### fullStack

Gets a stack trace for the error + all its causes.

```ts
import {fullStack} from 'berrors/helpers';

try {
  /* Something that can break */
} catch (err) {
  console.log('We had a mishap:', fullStack(err));
}
```

The output is similar to [`VError.fullStack()`](https://github.com/TritonDataCenter/node-verror#verrorfullstackerr) but
resolves causes in both [Error Causes](https://github.com/tc39/proposal-error-cause) style, `.cause`, and
[VError](https://github.com/TritonDataCenter/node-verror) style, `.cause()`.

_Note:_ [`fullStack`](#fullStack) has protection against circular causes

Output looks like:

```
Error: something really bad happened here
    at Object.<anonymous> (/examples/fullStack.js:5:12)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:968:3
Caused by: Error: something bad happened
    at Object.<anonymous> (/examples/fullStack.js:3:12)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:968:3
```

## Credits

This project is inspired and draws on the following projects:

- [spur-errors](https://github.com/opentable/spur-errors): Common error builder utility for Node.js. Contains common
  error types, and stack trace tracking to support more detailed error messages.
- [pony-cause](https://github.com/voxpelli/pony-cause): Ponyfill and helpers for the standardized Error Causes
- [error-class-utils](https://github.com/ehmicky/error-class-utils): Utilities for error classes
- [error-custom-class](https://github.com/ehmicky/error-custom-class): Create custom error classes
