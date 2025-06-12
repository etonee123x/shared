import { isNotNil } from '../utils/isNotNil';
import type { Nil } from '../types';
import type { Id } from '../types/id';

export const toId = (id: Omit<Id, 'Id'>): Id => id as Id;

export const areIdsEqual = (id1: Id | Nil, id2: Id | Nil) =>
  isNotNil(id1) && isNotNil(id2) && String(id1) === String(id2);
