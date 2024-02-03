import type { ICommonTagsResult, IFormat } from 'music-metadata';

export * from './utils';

export type NotEmptyArray<T> = [T, ...Array<T>];

export type Falsy = false | 0 | 0n | '' | null | undefined;

export enum HANDLER_NAME {
  GET_FOLDER_DATA = 'GET_FOLDER_DATA',
  HAPPY_NORMING = 'HAPPY_NORMING',
  FUNNY_ANIMALS = 'FUNNY_ANIMALS',
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

export class ItemBase {
  name: string;
  url: string;
  src: string;
  birthtime: string;

  numberOfThisExt?: number;

  constructor({ name, url, src, birthtime, numberOfThisExt }: ItemBase) {
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

export interface ItemFolder extends ItemBase {
  type: ITEM_TYPE.FOLDER;
}

export class ItemFolder extends ItemBase {
  type: ITEM_TYPE.FOLDER = ITEM_TYPE.FOLDER;
}

export interface ItemFile<Ext extends string = string> extends ItemBase {
  type: ITEM_TYPE.FILE;
  ext: Ext;
}

export class ItemFile<Ext extends string = string> extends ItemBase {
  type: ITEM_TYPE.FILE = ITEM_TYPE.FILE;
  constructor(
    baseItem: Omit<ItemFile<Ext>, 'ext' | 'type'>,
    public ext: Ext,
  ) {
    super(baseItem);
  }
}

export enum EXT_AUDIO {
  MP3 = '.mp3',
  WAV = '.wav',
}

export interface ItemAudio extends ItemFile<EXT_AUDIO> {
  metadata: Metadata;
}

export class ItemAudio extends ItemFile<EXT_AUDIO> {
  metadata: Metadata;

  constructor({ ext, ...baseItem }: Omit<ItemAudio, 'metadata'>, metadata: Metadata) {
    super(baseItem, ext);
    this.metadata = metadata;
  }
}

export enum EXT_PICTURE {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
}

export interface ItemPicture extends ItemFile<EXT_PICTURE> {}

export class ItemPicture extends ItemFile<EXT_PICTURE> {
  constructor({ ext, ...baseItem }: ItemPicture) {
    super(baseItem, ext);
  }
}

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
