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
  birthtimeMs: number;
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

export class ItemBase {
  name: string;
  url: string;
  src: string;
  birthtimeMs: number;

  numberOfThisExt?: number;

  constructor({ name, url, src, birthtimeMs, numberOfThisExt }: ItemBase) {
    this.name = name;
    this.url = url;
    this.src = src;
    this.birthtimeMs = birthtimeMs;

    this.numberOfThisExt = numberOfThisExt;
  }
}

export class ItemFolder extends ItemBase {
  type: ITEM_TYPE.FOLDER = ITEM_TYPE.FOLDER;
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

export class ItemVideo extends ItemFile<EXT_VIDEO> {
  constructor({ ext, ...baseItem }: ItemVideo) {
    super(baseItem, ext);
  }
}

export class ItemAudio extends ItemFile<EXT_AUDIO> {
  metadata: Metadata;

  constructor({ ext, ...baseItem }: Omit<ItemAudio, 'metadata'>, metadata: Metadata) {
    super(baseItem, ext);
    this.metadata = metadata;
  }
}

export class ItemImage extends ItemFile<EXT_IMAGE> {
  constructor({ ext, ...baseItem }: ItemImage) {
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

export const isExtAudio = (ext: string): ext is EXT_AUDIO => Object.values<string>(EXT_AUDIO).includes(ext);

export const isExtImage = (ext: string): ext is EXT_IMAGE => Object.values<string>(EXT_IMAGE).includes(ext);

export const isExtVideo = (ext: string): ext is EXT_VIDEO => Object.values<string>(EXT_VIDEO).includes(ext);

export const isItemFolder = (item: Item): item is ItemFolder => item.type === ITEM_TYPE.FOLDER;

export const isItemFile = (item: Item): item is ItemFile => item.type === ITEM_TYPE.FILE;

export const isItemAudio = (item: Item): item is ItemAudio => isItemFile(item) && isExtAudio(item.ext);

export const isItemImage = (item: Item): item is ItemImage => isItemFile(item) && isExtImage(item.ext);

export const isItemVideo = (item: Item): item is ItemVideo => isItemFile(item) && isExtVideo(item.ext);
