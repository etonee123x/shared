import { WithDatabaseMeta } from './database';

export interface Post extends WithDatabaseMeta {
  text: string;
  filesUrls: Array<string>;
}
