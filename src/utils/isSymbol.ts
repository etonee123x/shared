export const isSymbol = <T>(argument: T | symbol): argument is symbol => typeof argument === 'symbol';
