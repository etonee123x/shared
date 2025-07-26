import type { WithId } from '../helpers/id';

export interface WithTimestamps {
  createdAt: number;
  updatedAt?: number;
}

export interface WithSince {
  sinceCreated: number;
  sinceUpdated?: number;
}

export interface WithDatabaseMeta extends WithMeta<WithId & WithTimestamps> {}

export type ForPost<T extends object> = T;

export type ForPut<T extends object> = T & WithDatabaseMeta;

export type ForPatch<T extends object> = Partial<T & WithDatabaseMeta>;

export interface PaginationMeta {
  perPage: number;
  page: number;
}

export interface WithIsEnd {
  isEnd: boolean;
}

export interface WithMeta<Meta> {
  _meta: Meta;
}
