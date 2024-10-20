import type { NotEmptyArray } from '../types';

import { isArray } from './isArray';

export const isNotEmptyArray = <T>(argument: unknown | Array<T>): argument is NotEmptyArray<T> =>
  Boolean(isArray(argument) && argument.length);
