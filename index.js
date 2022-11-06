export class BaseItem {
    constructor({ name, url, src, birthtime, numberOfThisExt }) {
        this.name = name;
        this.url = url;
        this.src = src;
        this.birthtime = birthtime;
        this.numberOfThisExt = numberOfThisExt;
    }
}
export var ItemTypes;
(function (ItemTypes) {
    ItemTypes["FOLDER"] = "folder";
    ItemTypes["FILE"] = "file";
})(ItemTypes || (ItemTypes = {}));
export class FolderItem extends BaseItem {
    constructor() {
        super(...arguments);
        this.type = ItemTypes.FOLDER;
        this.ext = null;
    }
}
export class FileItem extends BaseItem {
    constructor() {
        super(...arguments);
        this.type = ItemTypes.FILE;
    }
}
export class LinkedFileItem extends FileItem {
    constructor(fileItem, { ext }) {
        super(fileItem);
        this.ext = ext;
    }
    set metadata(value) {
        this._metadata = value;
    }
    get metadata() {
        return this._metadata;
    }
}
export var AudioExts;
(function (AudioExts) {
    AudioExts["MP3"] = ".mp3";
    AudioExts["WAV"] = ".wav";
})(AudioExts || (AudioExts = {}));
export class AudioItem extends FileItem {
    constructor(fileItem, { metadata, ext }) {
        super(fileItem);
        this.metadata = metadata;
        this.ext = ext;
    }
}
export var PictureExts;
(function (PictureExts) {
    PictureExts["JPG"] = ".jpg";
    PictureExts["JPEG"] = ".jpeg";
    PictureExts["PNG"] = ".png";
})(PictureExts || (PictureExts = {}));
export class PictureItem extends FileItem {
    constructor(fileItem, { ext }) {
        super(fileItem);
        this.ext = ext;
    }
}
export class PlaylistItem extends AudioItem {
    constructor(audioItem, { thisIsLinkedFile }) {
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
class KnownError extends Error {
}