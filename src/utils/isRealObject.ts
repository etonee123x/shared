import { isArray } from './isArray';
import { isObject } from './isObject';

export const isRealObject = <T>(argument: T | Record<string, unknown>): argument is Record<string, unknown> =>
  Boolean(argument && isObject(argument) && !isArray(argument));
