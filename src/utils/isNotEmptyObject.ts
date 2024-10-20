import { isRealObject } from './isRealObject';
import { isNotEmptyArray } from './isNotEmptyArray';

export const isNotEmptyObject = <T>(argument: T | Record<string, unknown>): argument is Record<string, unknown> =>
  isRealObject(argument) && isNotEmptyArray(Object.values(argument));
