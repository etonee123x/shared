export var ROUTE;
(function (ROUTE) {
    ROUTE["GET_FOLDER_DATA"] = "/get-folder-data";
    ROUTE["HAPPY_NORMING"] = "/happy-norming/";
    ROUTE["FUNNY_ANIMALS"] = "/funny-animals/";
    ROUTE["AUTH"] = "/auth/";
    ROUTE["PARSER"] = "/parser/";
    ROUTE["MAIN"] = "/";
})(ROUTE = ROUTE || (ROUTE = {}));
export class BaseItem {
    name;
    url;
    src;
    birthtime;
    numberOfThisExt;
    constructor({ name, url, src, birthtime, numberOfThisExt }) {
        this.name = name;
        this.url = url;
        this.src = src;
        this.birthtime = birthtime;
        this.numberOfThisExt = numberOfThisExt;
    }
}
export var ITEM_TYPE;
(function (ITEM_TYPE) {
    ITEM_TYPE["FOLDER"] = "folder";
    ITEM_TYPE["FILE"] = "file";
})(ITEM_TYPE = ITEM_TYPE || (ITEM_TYPE = {}));
export class FolderItem extends BaseItem {
    type = ITEM_TYPE.FOLDER;
    ext = null;
}
export class FileItem extends BaseItem {
    type = ITEM_TYPE.FILE;
}
export var AUDIO_EXT;
(function (AUDIO_EXT) {
    AUDIO_EXT["MP3"] = ".mp3";
    AUDIO_EXT["WAV"] = ".wav";
})(AUDIO_EXT = AUDIO_EXT || (AUDIO_EXT = {}));
export class AudioItem extends FileItem {
    ext;
    metadata;
    constructor(fileItem, { metadata, ext }) {
        super(fileItem);
        this.metadata = metadata;
        this.ext = ext;
    }
}
export var PICTURE_EXT;
(function (PICTURE_EXT) {
    PICTURE_EXT["JPG"] = ".jpg";
    PICTURE_EXT["JPEG"] = ".jpeg";
    PICTURE_EXT["PNG"] = ".png";
})(PICTURE_EXT = PICTURE_EXT || (PICTURE_EXT = {}));
export class PictureItem extends FileItem {
    ext;
    constructor(fileItem, { ext }) {
        super(fileItem);
        this.ext = ext;
    }
}
export class KnownError extends Error {
}
