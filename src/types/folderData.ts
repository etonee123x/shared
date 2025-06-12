import type { ICommonTagsResult, IFormat } from 'music-metadata';

export enum ITEM_TYPE {
  FOLDER = 'folder',
  FILE = 'file',
}

export enum EXT_AUDIO {
  MP3 = '.mp3',
  OGG = '.ogg',
  WAV = '.wav',
}

export enum EXT_IMAGE {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
}

export enum EXT_VIDEO {
  MP4 = '.mp4',
  // TODO: надо починить весь механизм, а не добавлять костыли
  MP4_UPPERCASE = '.MP4',
  WEBM = '.webm',
}

export type Metadata = {
  bitrate: IFormat['bitrate'];
  duration: NonNullable<IFormat['duration']>;
  artists: NonNullable<ICommonTagsResult['artists']>;
} & Pick<ICommonTagsResult, 'album' | 'bpm' | 'year'>;

export interface ItemBase {
  name: string;
  url: string;
  src: string;
  birthtime: string;

  numberOfThisExt?: number;
}

export interface ItemFolder extends ItemBase {
  type: ITEM_TYPE.FOLDER;
}

export interface ItemFile<Ext extends string = string> extends ItemBase {
  type: ITEM_TYPE.FILE;
  ext: Ext;
}

export interface ItemAudio extends ItemFile<EXT_AUDIO> {
  metadata: Metadata;
}

export interface ItemImage extends ItemFile<EXT_IMAGE> {}

export interface ItemVideo extends ItemFile<EXT_VIDEO> {}

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
