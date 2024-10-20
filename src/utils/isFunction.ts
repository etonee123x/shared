import type { FunctionType } from '@shared/types';

export const isFunction = <T>(argument: T | FunctionType): argument is FunctionType => typeof argument === 'function';
