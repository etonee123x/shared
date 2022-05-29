/// Folder Data

export interface Metadata {
  bitrate?: number;
  duration: string;
  album?: string;
  artists?: string[];
  bpm?: number;
  year?: number;
}

export interface Item {
  name: string;
  type: string;
  ext: string | null;
  url: string;
  numberOfThisExt: number;
  birthTime: Date;
  metadata?: Metadata;
}

export interface LinkedFile {
  name: string;
  ext: string;
  url: string;
  metadata?: Metadata;
}

export interface NavItem {
  text: string;
  link: string;
}

export interface PlaylistItem {
  name: string;
  ext: string;
  url: string;
  thisIsLinkedFile: boolean;
  metadata?: Metadata;
}

export interface Paths {
  rel: string;
  abs: string;
  lvlUp: string | null;
}

export interface FolderData {
  linkedFile: LinkedFile | string;
  currentDirectory: string;
  filesList: Item[];
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
