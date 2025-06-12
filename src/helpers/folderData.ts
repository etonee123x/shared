import { EXT_AUDIO, EXT_IMAGE, EXT_VIDEO, ITEM_TYPE, type Item, type Metadata } from '../types/folderData';

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

export const isExtAudio = (ext: string): ext is EXT_AUDIO => Object.values<string>(EXT_AUDIO).includes(ext);

export const isExtImage = (ext: string): ext is EXT_IMAGE => Object.values<string>(EXT_IMAGE).includes(ext);

export const isExtVideo = (ext: string): ext is EXT_VIDEO => Object.values<string>(EXT_VIDEO).includes(ext);

export const isItemFolder = (item: Item): item is ItemFolder => item.type === ITEM_TYPE.FOLDER;

export const isItemFile = (item: Item): item is ItemFile => item.type === ITEM_TYPE.FILE;

export const isItemAudio = (item: Item): item is ItemAudio => isItemFile(item) && isExtAudio(item.ext);

export const isItemImage = (item: Item): item is ItemImage => isItemFile(item) && isExtImage(item.ext);

export const isItemVideo = (item: Item): item is ItemVideo => isItemFile(item) && isExtVideo(item.ext);
