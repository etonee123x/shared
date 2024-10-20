export const isBigint = <T>(argument: T | bigint): argument is bigint => typeof argument === 'bigint';
