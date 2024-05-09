import { type WithDatabaseFields } from '../';

export interface PostData {
  text: string;
  files: Array<File>;
}

export interface Post extends PostData, WithDatabaseFields {}
