import type { WithId } from '../helpers/id';

export interface WithTimestamps {
  createdAt: number;
  updatedAt?: number;
}

export interface WithSinceTimestamps {
  sinceCreated: number;
  sinceUpdated?: number;
}

export interface WithDatabaseMeta extends WithMeta<WithId & WithTimestamps> {}

export type ForPost<T extends WithDatabaseMeta> = Omit<T, '_meta'>;

export type ForPut<T extends WithDatabaseMeta> = T;

export type ForPatch<T extends WithDatabaseMeta> = Partial<T>;

export interface WithPage {
  page: number;
}

export interface PaginationMeta extends WithPage {
  perPage: number;
}

export interface WithIsEnd {
  isEnd: boolean;
}

export interface WithMeta<Meta> {
  _meta: Meta;
}
