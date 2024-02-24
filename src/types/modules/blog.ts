import { type WithId } from '../';

export interface PostData {
  text: string;
}

export interface Post extends WithId, PostData {
  createdAt: string;
}
