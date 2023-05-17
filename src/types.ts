/**
 * Error class name
 */
export type ErrorName = `${string}Error`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorConstructor = new (...args: any[]) => Error;
