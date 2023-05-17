// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setNonEnumProp = (object: any, propName: string, value: unknown) => {
  Object.defineProperty(object, propName, {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });
};
