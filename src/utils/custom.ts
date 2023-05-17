import {ErrorName} from '../types';
import {ponyfillCause} from './cause';
import {ensureCorrectClass} from './class';
import {setErrorName} from './name';

export function errorCustomClass(name: ErrorName) {
  const CustomErrorClass = class extends Error {
    constructor(message?: string, options?: {cause?: unknown}) {
      super(message);
      ensureCorrectClass(this, new.target);
      ponyfillCause(this, options);
    }
  };
  setErrorName(CustomErrorClass, name);
  return CustomErrorClass;
}
