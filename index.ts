import type { ICommonTagsResult, IFormat } from 'music-metadata';

export type NotEmptyArray<T> = [T, ...T[]];

export type Falsy = false | 0 | 0n | '' | null | undefined;

export enum HANDLER_NAME {
  GET_FOLDER_DATA = 'GET_FOLDER_DATA',
  HAPPY_NORMING = 'HAPPY_NORMING',
  FUNNY_ANIMALS = 'FUNNY_ANIMALS',
}

export type Metadata = {
  bitrate: IFormat['bitrate'];
  duration: NonNullable<IFormat['duration']>;
  artists: NonNullable<ICommonTagsResult['artists']>
} & Pick<ICommonTagsResult, 'album' | 'bpm' | 'year'>;

export class BaseItem {
  name: string;
  url: string;
  src: string;
  birthtime: string;

  numberOfThisExt?: number;

  constructor ({ name, url, src, birthtime, numberOfThisExt }: BaseItem) {
    this.name = name;
    this.url = url;
    this.src = src;
    this.birthtime = birthtime;

    this.numberOfThisExt = numberOfThisExt;
  }
}

export enum ITEM_TYPE {
  FOLDER = 'folder',
  FILE = 'file',
}

export class FolderItem extends BaseItem {
  type = ITEM_TYPE.FOLDER;
  ext = null;
}

export class FileItem<Ext extends string = string> extends BaseItem {
  type = ITEM_TYPE.FILE;
  constructor (baseItem: Omit<FileItem<Ext>, 'ext' | 'type'>, public ext: Ext) {
    super(baseItem);
  }
}

export enum EXT_AUDIO {
  MP3 = '.mp3',
  WAV = '.wav',
}

export class AudioItem extends FileItem<EXT_AUDIO> {
  metadata: Metadata;

  constructor (
    { ext, ...baseItem }: Omit<AudioItem, 'metadata'>,
    metadata: Metadata,
  ) {
    super(baseItem, ext);
    this.metadata = metadata;
  }
}

export enum EXT_PICTURE {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
}

export class PictureItem extends FileItem<EXT_PICTURE> {
  constructor ({ ext, ...baseItem }: PictureItem) {
    super(baseItem, ext);
  }
}

export type Item = FileItem | FolderItem;

export interface NavItem {
  text: string;
  link: string;
}

export interface FolderData {
  linkedFile: FileItem | null;
  items: Item[];
  lvlUp: string | null;
  navigation: NavItem[];
}
