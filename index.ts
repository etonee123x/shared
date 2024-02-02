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

export class FileItem extends BaseItem {
  type = ITEM_TYPE.FILE;
}

export enum EXT_AUDIO {
  MP3 = '.mp3',
  WAV = '.wav',
}

export class AudioItem extends FileItem {
  ext: EXT_AUDIO;
  metadata: Metadata;
  constructor (
    fileItem: FileItem,
    { metadata, ext }: { metadata: Metadata; ext: EXT_AUDIO },
  ) {
    super(fileItem);
    this.metadata = metadata;
    this.ext = ext;
  }
}

export enum EXT_PICTURE {
  JPG = '.jpg',
  JPEG = '.jpeg',
  PNG = '.png',
}

export class PictureItem extends FileItem {
  ext: EXT_PICTURE;
  constructor (fileItem: FileItem, { ext }: { ext: EXT_PICTURE }) {
    super(fileItem);
    this.ext = ext;
  }
}

export type FileWithKnownType = PictureItem | AudioItem

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
