import { isNotNil } from '../utils/isNotNil';
import type { Nil } from '../types';

export type Id = (string | number) & { readonly Id: unique symbol };

export interface WithId {
  id: Id;
}

export const toId = (id: Omit<Id, 'Id'>): Id => id as Id;

export const areIdsEqual = (id1: Id | Nil, id2: Id | Nil) =>
  isNotNil(id1) && isNotNil(id2) && String(id1) === String(id2);
