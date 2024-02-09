import {
  EXT_AUDIO,
  EXT_PICTURE,
  ITEM_TYPE,
  type NotEmptyArray,
  type Falsy,
  type Item,
  type ItemFolder,
  type ItemFile,
  type ItemAudio,
  type ItemPicture,
} from '.';

export const isString = (arg: unknown): arg is string => typeof arg === 'string';
export const isArray = <T>(arg: unknown): arg is Array<T> => Array.isArray(arg);
export const isRealObject = (arg: unknown): arg is Record<string, unknown> =>
  Boolean(arg && typeof arg === 'object' && !Array.isArray(arg));

export const extIsAudio = (arg: unknown): arg is EXT_AUDIO =>
  isString(arg) && Object.values<string>(EXT_AUDIO).includes(arg);

export const extIsPicture = (arg: unknown): arg is EXT_PICTURE =>
  isString(arg) && Object.values<string>(EXT_PICTURE).includes(arg);

export const isNil = <T>(arg: T | null | undefined): arg is null | undefined => arg == null;

export const isNotNil = <T>(arg: T | null | undefined): arg is T => !isNil(arg);

export const isNotEmptyArray = <T>(arg: Array<T> | null | undefined): arg is NotEmptyArray<T> =>
  Boolean(isArray(arg) && arg.length);

export const isNotEmptyObject = (arg: unknown) =>
  Boolean(arg && typeof arg === 'object' && isNotEmptyArray(Object.keys(arg)));

export const isTruthy = <T>(arg: T): arg is Exclude<T, Falsy> => Boolean(arg);

interface CustomError {
  data: unknown;
  statusCode: number;
  __isCustomError: true;
}

const CUSTOM_ERROR_UNKNOWN_STATUS_CODE = -1;

export const createError = ({ data, statusCode }: Partial<Omit<CustomError, '__isCustomError'>>) => ({
  data,
  statusCode: isNil(statusCode) ? CUSTOM_ERROR_UNKNOWN_STATUS_CODE : statusCode,
  __isCustomError: true,
});

export const createErrorClient = (data: CustomError['data']) =>
  createError({
    data,
    statusCode: 400,
  });

export const createErrorServer = (data: CustomError['data']) =>
  createError({
    data,
    statusCode: 500,
  });

export const isCustomError = (arg: unknown): arg is CustomError => isRealObject(arg) && arg.__isCustomError === true;

export const isCustomErrorClient = (arg: CustomError) => arg.statusCode >= 400 && arg.statusCode < 500;
export const isCustomErrorServer = (arg: CustomError) => arg.statusCode >= 500 && arg.statusCode < 600;
export const isCustomErrorUnknown = (arg: CustomError) => arg.statusCode === CUSTOM_ERROR_UNKNOWN_STATUS_CODE;

export const omit = <T1 extends Record<string, unknown>, T2 extends keyof T1>(
  object: T1,
  keys: Array<T2>,
): Omit<T1, T2> =>
  Object.fromEntries(Object.entries(object).filter(([key]) => !keys.includes(key as T2))) as Omit<T1, T2>;

export const pick = <T1 extends Record<string, unknown>, T2 extends keyof T1>(
  object: T1,
  keys: Array<T2>,
): Pick<T1, T2> =>
  Object.fromEntries(Object.entries(object).filter(([key]) => keys.includes(key as T2))) as Pick<T1, T2>;

export const isExtAudio = (ext: string): ext is EXT_AUDIO => Object.values<string>(EXT_AUDIO).includes(ext);
export const isExtPicture = (ext: string): ext is EXT_PICTURE => Object.values<string>(EXT_PICTURE).includes(ext);

export const isItemFolder = (item: Item): item is ItemFolder => item.type === ITEM_TYPE.FOLDER;
export const isItemFile = (item: Item): item is ItemFile => item.type === ITEM_TYPE.FILE;
export const isItemAudio = (item: Item): item is ItemAudio => isItemFile(item) && isExtAudio(item.ext);
export const isItemPicture = (item: Item): item is ItemPicture => isItemFile(item) && isExtPicture(item.ext);

export const wrapToArray = <T>(arg: T | Array<T>): Array<T> => (isArray(arg) ? arg : [arg]);

export const toLowerCase = <T extends string>(string: T): Lowercase<T> => string.toLowerCase() as Lowercase<T>;
export const toUpperCase = <T extends string>(string: T): Uppercase<T> => string.toUpperCase() as Uppercase<T>;
