import type { Primitive } from '@shared/types';

import { isNil } from './isNil';
import { isBoolean } from './isBoolean';
import { isNumber } from './isNumber';
import { isBigint } from './isBigint';
import { isString } from './isString';
import { isSymbol } from './isSymbol';

export const isPrimitive = <T>(argument: T | Primitive): argument is Primitive =>
  [isNil, isBoolean, isNumber, isBigint, isString, isSymbol].some((func) => func(argument));
