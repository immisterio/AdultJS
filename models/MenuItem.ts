export class MenuItem {
    title: string;
    playlist_url: string;
    search_on?: string;
    submenu?: MenuItem[];

    constructor(title: string, playlist_url: string, search_on?: string, submenu?: MenuItem[]) {
        this.title = title;
        this.playlist_url = playlist_url;
        if (search_on) this.search_on = search_on;
        if (submenu) this.submenu = submenu;
    }
}
