import { isNil } from '@etonee123x/shared/utils/isNil';

export const objectGet = (object: unknown, path: string | number | Array<string | number>): unknown | undefined => {
  if (isNil(object)) {
    return;
  }

  let pathArray: Array<string>;

  if (Array.isArray(path)) {
    pathArray = path.map(String);
  } else if (typeof path === 'number') {
    pathArray = [String(path)];
  } else {
    pathArray = path.split('.');
  }

  let result: unknown = object;

  for (let i = 0; i < pathArray.length; i++) {
    const maybeKey = pathArray[i];

    if (isNil(maybeKey)) {
      return;
    }

    if (isNil(result)) {
      return result;
    }

    if (!Object.prototype.hasOwnProperty.call(result, maybeKey)) {
      return;
    }

    result = (result as { [maybeKey]: unknown })[maybeKey];
  }

  return result;
};
