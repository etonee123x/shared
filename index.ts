export type Metadata = {
  bitrate?: number;
  duration: number;
  album?: string;
  artists?: string[];
  bpm?: number;
  year?: number;
};

export class BaseItem {
  name: string;
  url: string;
  src: string;
  birthtime: Date;
  numberOfThisExt?: number;
  constructor ({ name, url, src, birthtime, numberOfThisExt }: BaseItem) {
    this.name = name;
    this.url = url;
    this.src = src;
    this.birthtime = birthtime;
    this.numberOfThisExt = numberOfThisExt;
  }
}

export enum ItemTypes {
  FOLDER = 'folder',
  FILE = 'file',
}

export class FolderItem extends BaseItem {
  type = ItemTypes.FOLDER;
  ext = null;
}

export class FileItem extends BaseItem {
  type = ItemTypes.FILE;
}

export class LinkedFileItem extends FileItem {
  ext: string;
  private _metadata: Metadata | undefined;
  constructor (fileItem: FileItem, { ext }: { ext: string }) {
    super(fileItem);
    this.ext = ext;
  }

  set metadata (value: Metadata | undefined) {
    this._metadata = value;
  }

  get metadata () {
    return this._metadata;
  }
}

export enum AudioExts {
  MP3 = '.mp3',
  WAV = '.wav',
}

export class AudioItem extends FileItem {
  ext: AudioExts;
  metadata: Metadata;
  constructor (
    fileItem: FileItem,
    { metadata, ext }: { metadata: Metadata, ext: AudioExts },
  ) {
    super(fileItem);
    this.metadata = metadata;
    this.ext = ext;
  }
}

export enum PictureExts {
  JPG = '.jpg',
  PNG = '.png',
}

export class PictureItem extends FileItem {
  ext: PictureExts;
  constructor (fileItem: FileItem, { ext }: { ext: PictureExts }) {
    super(fileItem);
    this.ext = ext;
  }
}

export class PlaylistItem extends AudioItem {
  thisIsLinkedFile: boolean;
  constructor (audioItem: AudioItem, { thisIsLinkedFile }: { thisIsLinkedFile: boolean }) {
    super({
      birthtime: audioItem.birthtime,
      src: audioItem.src,
      url: audioItem.url,
      name: audioItem.name,
      numberOfThisExt: audioItem.numberOfThisExt,
      type: audioItem.type,
    }, {
      metadata: audioItem.metadata,
      ext: audioItem.ext,
    });
    this.thisIsLinkedFile = thisIsLinkedFile;
  }
}

export type Item = PictureItem | AudioItem | FolderItem;

export interface NavItem {
  text: string;
  link: string;
}

export interface Paths {
  abs: string;
  rel: string;
  lvlUp: string | null;
}

export interface FolderData {
  linkedFile: LinkedFileItem | null;
  currentDirectory: string;
  items: Item[];
  playlist: PlaylistItem[] | null;
  paths: Paths;
  navigation: NavItem[];
}

/// RMS

export type SampleRateValues = 44100 | 48000;

export type Headers = {
  channelsNumber: number;
  sampleRate: SampleRateValues;
  byteRate: number;
  blockAlign: number;
  bitsPerSample: number;
};

export type Channels = {
  left: Float32Array;
  right: Float32Array;
};

export type IntervalAndList = {
  interval: {
    min: number;
    max: number;
  };
  list: number[];
};

export interface RMSValue extends IntervalAndList {
  textBand: {
    from: number | string;
    to: number | string;
  };
}

export type BandTitles = 'all' | 'b' | 'lm' | 'hm' | 'h';

export type RMSValues = Record<BandTitles, RMSValue>;

export type SpectrumValues = {
  spectrum: Float32Array[];
  nyquistFrequency: number;
  lengthX: number;
  lengthY: number;
};

export type AudioSegment = {
  start: number;
  end: number;
};

export type TheLoudestSegment = {
  borders: AudioSegment;
  channels: Channels;
};

export type WavData = {
  headers?: Headers;
  compressionRate: number;
  compressedChannels?: Channels;
  duration?: number;
  theLoudestSegment?: TheLoudestSegment;
};

export type SpectrumOptions = {
  windowSize: 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384;
  overlap: number;
  delayBetweenOperations: number;
  shouldUseWindowFunction: boolean;
};

export type onLoadingParams = {
  bandTitle: BandTitles;
  progress: number;
};

export type OtherOptions = {
  useFastMode?: boolean;
  onLoading?: (arg0: onLoadingParams) => unknown;
};

class KnownError extends Error {

}

export type ErrorLike = KnownError | Error
export type LoginAndPassword = { login: string, password: string }

export type TokenOrLoginAndPassword = { token: string } | LoginAndPassword
