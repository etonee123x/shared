import { type WithId } from '../';

export interface Post extends WithId {
  createdAt: string;
  text: string;
}
