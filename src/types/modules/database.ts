import type { WithId } from '..';

export interface WithCreatedAt {
  createdAt: number;
}

export interface WithUpdatedAt {
  updatedAt: number;
}

export interface WithDatabaseFields extends WithId, WithCreatedAt, WithUpdatedAt {}
