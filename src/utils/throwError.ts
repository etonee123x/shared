export const throwError = (...parameters: Parameters<typeof Error>) => {
  throw new Error(...parameters);
};
