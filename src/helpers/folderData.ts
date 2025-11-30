import type { ICommonTagsResult, IFormat } from 'music-metadata';
import { WithMeta, WithTimestamps } from '../types/database';

export const ITEM_TYPES = {
  FOLDER: 'FOLDER',
  FILE: 'FILE',
} as const;

export const FILE_TYPES = {
  AUDIO: 'AUDIO',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  UNKNOWN: 'UNKNOWN',
} as const;

interface Size {
  width: number;
  height: number;
}

export interface ItemBase extends WithMeta<WithTimestamps> {
  name: string;
}

export interface ItemFolder extends ItemBase {
  itemType: typeof ITEM_TYPES.FOLDER;
}

export interface ItemFileBase<FileType extends keyof typeof FILE_TYPES = keyof typeof FILE_TYPES> extends ItemBase {
  itemType: typeof ITEM_TYPES.FILE;
  fileType: FileType;
}

export interface ItemAudio extends ItemFileBase<typeof FILE_TYPES.AUDIO> {
  metadata: Pick<ICommonTagsResult, 'album' | 'bpm' | 'year' | 'artists'> & Pick<IFormat, 'bitrate' | 'duration'>;
}

export interface ItemImage extends ItemFileBase<typeof FILE_TYPES.IMAGE> {
  metadata: Size;
}

export interface ItemVideo extends ItemFileBase<typeof FILE_TYPES.VIDEO> {
  metadata: Size;
}

export interface ItemUnknown extends ItemFileBase<typeof FILE_TYPES.UNKNOWN> {}

export type ItemFile = ItemAudio | ItemImage | ItemVideo | ItemUnknown;

export type Item = ItemFile | ItemFolder;

export interface NavigationItem {
  text: string;
  link: string;
}

export interface FolderData {
  linkedFile: ItemFile | null;
  items: Array<Item>;
  lvlUp: string | null;
  navigationItems: Array<NavigationItem>;
}

export const extensionToFileType = (extension: string) => {
  const EXTENSIONS_AUDIO = ['.mp3', '.ogg', '.wav'];
  const EXTENSIONS_IMAGE = ['.jpg', '.jpeg', '.png'];
  const EXTENSIONS_VIDEO = ['.mp4', '.webm'];

  const extensionLowerCased = extension.toLowerCase();

  if (EXTENSIONS_AUDIO.includes(extensionLowerCased)) {
    return FILE_TYPES.AUDIO;
  }

  if (EXTENSIONS_IMAGE.includes(extensionLowerCased)) {
    return FILE_TYPES.IMAGE;
  }

  if (EXTENSIONS_VIDEO.includes(extensionLowerCased)) {
    return FILE_TYPES.VIDEO;
  }

  return null;
};
