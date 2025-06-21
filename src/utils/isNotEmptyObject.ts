import { isRealObject } from './isRealObject';

export const isNotEmptyObject = <T>(argument: T | Record<string, unknown>): argument is Record<string, unknown> =>
  isRealObject(argument) && Boolean(Object.values(argument).length);
