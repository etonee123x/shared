import { type WithDatabaseFields } from '../';

export interface PostData {
  text: string;
}

export interface Post extends PostData, WithDatabaseFields {}
