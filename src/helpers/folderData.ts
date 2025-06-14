import {
  EXT_AUDIO,
  EXT_IMAGE,
  EXT_VIDEO,
  ITEM_TYPE,
  type ItemAudio,
  type ItemFile,
  type ItemFolder,
  type ItemImage,
  type ItemVideo,
  type Item,
} from '../types/folderData';

export const isExtAudio = (ext: string): ext is EXT_AUDIO => Object.values<string>(EXT_AUDIO).includes(ext);

export const isExtImage = (ext: string): ext is EXT_IMAGE => Object.values<string>(EXT_IMAGE).includes(ext);

export const isExtVideo = (ext: string): ext is EXT_VIDEO => Object.values<string>(EXT_VIDEO).includes(ext);

export const isItemFolder = (item: Item): item is ItemFolder => item.type === ITEM_TYPE.FOLDER;

export const isItemFile = (item: Item): item is ItemFile => item.type === ITEM_TYPE.FILE;

export const isItemAudio = (item: Item): item is ItemAudio => isItemFile(item) && isExtAudio(item.ext);

export const isItemImage = (item: Item): item is ItemImage => isItemFile(item) && isExtImage(item.ext);

export const isItemVideo = (item: Item): item is ItemVideo => isItemFile(item) && isExtVideo(item.ext);
