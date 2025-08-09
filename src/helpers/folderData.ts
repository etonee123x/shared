import type { ICommonTagsResult, IFormat } from 'music-metadata';
import { WithMeta, WithTimestamps } from '../types/database';

export enum ITEM_TYPE {
  FOLDER = 'folder',
  FILE = 'file',
}

export enum FILE_TYPE {
  AUDIO = 'audio',
  IMAGE = 'image',
  VIDEO = 'video',
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

export interface MusicMetadata
  extends Pick<ICommonTagsResult, 'album' | 'bpm' | 'year' | 'artists'>,
    Pick<IFormat, 'bitrate' | 'duration'> {}

export interface ItemBase extends WithMeta<WithTimestamps> {
  name: string;
  url: string;
  src: string;
}

export interface ItemFolder extends ItemBase {
  type: ITEM_TYPE.FOLDER;
}

export interface ItemFile<Ext extends string = string> extends ItemBase {
  type: ITEM_TYPE.FILE;
  ext: Ext;
}

export interface ItemAudio extends ItemFile<EXT_AUDIO> {
  musicMetadata: MusicMetadata;
}

export interface ItemImage extends ItemFile<EXT_IMAGE> {}

export interface ItemVideo extends ItemFile<EXT_VIDEO> {}

export class ItemBase {
  name: string;
  url: string;
  src: string;
  _meta: WithTimestamps;

  constructor({ name, url, src, _meta }: ItemBase) {
    this.name = name;
    this.url = url;
    this.src = src;
    this._meta = _meta;
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
  constructor(
    { ext, ...baseItem }: Omit<ItemAudio, 'musicMetadata'>,
    public musicMetadata: MusicMetadata,
  ) {
    super(baseItem, ext);
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

export const extentionToFileType = (ext: string): FILE_TYPE | undefined => {
  if (isExtAudio(ext)) {
    return FILE_TYPE.AUDIO;
  }

  if (isExtImage(ext)) {
    return FILE_TYPE.IMAGE;
  }

  if (isExtVideo(ext)) {
    return FILE_TYPE.VIDEO;
  }

  return undefined;
};

export const isExtAudio = (ext: string): ext is EXT_AUDIO => Object.values<string>(EXT_AUDIO).includes(ext);

export const isExtImage = (ext: string): ext is EXT_IMAGE => Object.values<string>(EXT_IMAGE).includes(ext);

export const isExtVideo = (ext: string): ext is EXT_VIDEO => Object.values<string>(EXT_VIDEO).includes(ext);

export const isItemFolder = (item: Item): item is ItemFolder => item.type === ITEM_TYPE.FOLDER;

export const isItemFile = (item: Item): item is ItemFile => item.type === ITEM_TYPE.FILE;

export const isItemAudio = (item: Item): item is ItemAudio => isItemFile(item) && isExtAudio(item.ext);

export const isItemImage = (item: Item): item is ItemImage => isItemFile(item) && isExtImage(item.ext);

export const isItemVideo = (item: Item): item is ItemVideo => isItemFile(item) && isExtVideo(item.ext);
