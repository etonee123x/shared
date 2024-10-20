import { isNil } from './isNil';

export const isNotNil = <T>(argument: T | null | undefined): argument is T => !isNil(argument);
