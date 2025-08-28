export class PlaylistItem {
    name: string;
    video: string;
    picture: string;
    preview: string | null;
    time: string | null;
    quality: string | null;
    json: boolean;
    related: boolean;
    model: { uri: string; name: string } | null;

    constructor(
        name: string,
        video: string,
        picture: string,
        preview: string | null,
        time: string | null,
        quality: string | null,
        json: boolean,
        related: boolean,
        model: { uri: string; name: string } | null,
    ) {
        this.name = name;
        this.video = video;
        this.picture = picture;
        this.preview = preview;
        this.time = time;
        this.quality = quality;
        this.json = json;
        this.related = related;
        this.model = model;
    }
}