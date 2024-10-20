import type { ObjectType } from '../types';

import { isArray } from './isArray';
import { isFunction } from './isFunction';
import { isRealObject } from './isRealObject';

export const isObjectType = <T>(argument: T | ObjectType): argument is ObjectType =>
  [isRealObject, isArray, isFunction].some((func) => func(argument));
