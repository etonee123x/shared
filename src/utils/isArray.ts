export const isArray = <T>(argument: unknown | Array<T>): argument is Array<T> => Array.isArray(argument);
