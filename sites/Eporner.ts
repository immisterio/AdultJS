import { HttpClient } from '../engine/HttpClient';
import { Utils } from '../engine/Utils';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';

export class Eporner {
    public static host: string = 'https://www.eporner.com';

    async Invoke(reqUri: string) {
        if (reqUri.includes('/video')) {
            return new StreamLinksUnified(await this.StreamLinks(Eporner.host, reqUri), reqUri.includes('&related'));
        }
        else
        {
            const urlObj = new URL(reqUri, Eporner.host);
            const search = urlObj.searchParams.get('search') || '';
            const sort = urlObj.searchParams.get('sort') || '';
            const c = urlObj.searchParams.get('c') || '';
            const pg = parseInt(urlObj.searchParams.get('pg') || '1', 10);

            const url = this.buildUrl(Eporner.host, search, sort, c, pg);
            const html = await HttpClient.Get(url);

            return {
                menu: this.Menu(search, sort, c),
                list: this.Playlist(html)
            };
        }
    }

    buildUrl(host: string, search: string, sort: string, c: string, pg: number): string {
        let url = `${host}/`;
        if (search) {
            url += `search/${encodeURIComponent(search)}/`;
            if (pg > 1) url += `${pg}/`;
            if (sort) url += `${sort}/`;
        } else if (c) {
            url += `cat/${c}/`;
            if (pg > 1) url += `${pg}/`;
        } else {
            if (pg > 1) url += `${pg}/`;
            if (sort) url += `${sort}/`;
        }
        return url;
    }

    Playlist(html: string): PlaylistItem[] {
        if (!html) return [];
        let section = html;
        if (section.includes('class="toptopbelinset"'))
            section = section.split('class="toptopbelinset"')[1];
        if (section.includes('class="relatedtext"'))
            section = section.split('class="relatedtext"')[1];
        const rows = section.split(/<div class="mb (hdy)?"/);
        const playlists: PlaylistItem[] = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const g = /<p class="mbtit">\s*<a href="\/([^"]+)">([^<]+)<\/a>/i.exec(row);
            if (!g || !g[1] || !g[2]) continue;
            const quality = Utils.extract(row, /<div class="mvhdico"([^>]+)?><span>([^"<]+)/, 2);
            var img = Utils.extract(row, / data-src="([^"]+)"/);
            if (!img) img = Utils.extract(row, /<img src="([^"]+)"/);
            const dataid = Utils.extract(row, /data-id="([^"]+)"/);
            let preview = img && dataid ? img.replace(/\/[^/]+$/, '') + `/${dataid}-preview.webm` : null;
            const duration = Utils.extract(row, /<span class="mbtim"([^>]+)?>([^<]+)<\/span>/, 2);
            playlists.push(new PlaylistItem(
                g[2],
                `${Eporner.host}/${g[1]}`,
                img || '',
                preview,
                duration || null,
                quality || null,
                true,
                true
            ));
        }
        return playlists;
    }

    Menu(search: string, sort: string, c: string): MenuItem[] {
        const url = Eporner.host;
        const menu: MenuItem[] = [
            new MenuItem('Поиск', url, 'search_on')
        ];
        if (search) {
            menu.push(new MenuItem(
                `Сортировка: ${!sort ? 'новинки' : sort}`,
                'submenu',
                undefined,
                [
                    new MenuItem('Новинки', url + `?search=${encodeURIComponent(search)}`),
                    new MenuItem('Топ просмотра', url + `?sort=most-viewed&search=${encodeURIComponent(search)}`),
                    new MenuItem('Топ рейтинга', url + `?sort=top-rated&search=${encodeURIComponent(search)}`),
                    new MenuItem('Длинные ролики', url + `?sort=longest&search=${encodeURIComponent(search)}`),
                    new MenuItem('Короткие ролики', url + `?sort=shortest&search=${encodeURIComponent(search)}`)
                ]
            ));
            return menu;
        }
        if (!c) {
            menu.push(new MenuItem(
                `Сортировка: ${!sort ? 'новинки' : sort}`,
                'submenu',
                undefined,
                [
                    new MenuItem('Новинки', url),
                    new MenuItem('Топ просмотра', url + '?sort=most-viewed'),
                    new MenuItem('Топ рейтинга', url + '?sort=top-rated'),
                    new MenuItem('Длинные ролики', url + '?sort=longest'),
                    new MenuItem('Короткие ролики', url + '?sort=shortest')
                ]
            ));
        }
        const submenu = [
            new MenuItem("Все", url),
            new MenuItem("4K UHD", url + "?c=4k-porn"),
            new MenuItem("60 FPS", url + "?c=60fps"),
            new MenuItem("Amateur", url + "?c=amateur"),
            new MenuItem("Anal", url + "?c=anal"),
            new MenuItem("Asian", url + "?c=asian"),
            new MenuItem("ASMR", url + "?c=asmr"),
            new MenuItem("BBW", url + "?c=bbw"),
            new MenuItem("BDSM", url + "?c=bdsm"),
            new MenuItem("Big Ass", url + "?c=big-ass"),
            new MenuItem("Big Dick", url + "?c=big-dick"),
            new MenuItem("Big Tits", url + "?c=big-tits"),
            new MenuItem("Bisexual", url + "?c=bisexual"),
            new MenuItem("Blonde", url + "?c=blonde"),
            new MenuItem("Blowjob", url + "?c=blowjob"),
            new MenuItem("Bondage", url + "?c=bondage"),
            new MenuItem("Brunette", url + "?c=brunette"),
            new MenuItem("Bukkake", url + "?c=bukkake"),
            new MenuItem("Creampie", url + "?c=creampie"),
            new MenuItem("Cumshot", url + "?c=cumshot"),
            new MenuItem("Double Penetration", url + "?c=double-penetration"),
            new MenuItem("Ebony", url + "?c=ebony"),
            new MenuItem("Fat", url + "?c=fat"),
            new MenuItem("Fetish", url + "?c=fetish"),
            new MenuItem("Fisting", url + "?c=fisting"),
            new MenuItem("Footjob", url + "?c=footjob"),
            new MenuItem("For Women", url + "?c=for-women"),
            new MenuItem("Gay", url + "?c=gay"),
            new MenuItem("Group Sex", url + "?c=group-sex"),
            new MenuItem("Handjob", url + "?c=handjob"),
            new MenuItem("Hardcore", url + "?c=hardcore"),
            new MenuItem("Hentai", url + "?c=hentai"),
            new MenuItem("Homemade", url + "?c=homemade"),
            new MenuItem("Hotel", url + "?c=hotel"),
            new MenuItem("Housewives", url + "?c=housewives"),
            new MenuItem("Indian", url + "?c=indian"),
            new MenuItem("Interracial", url + "?c=interracial"),
            new MenuItem("Japanese", url + "?c=japanese"),
            new MenuItem("Latina", url + "?c=latina"),
            new MenuItem("Lesbian", url + "?c=lesbians"),
            new MenuItem("Lingerie", url + "?c=lingerie"),
            new MenuItem("Massage", url + "?c=massage"),
            new MenuItem("Masturbation", url + "?c=masturbation"),
            new MenuItem("Mature", url + "?c=mature"),
            new MenuItem("MILF", url + "?c=milf"),
            new MenuItem("Nurses", url + "?c=nurse"),
            new MenuItem("Office", url + "?c=office"),
            new MenuItem("Older Men", url + "?c=old-man"),
            new MenuItem("Orgy", url + "?c=orgy"),
            new MenuItem("Outdoor", url + "?c=outdoor"),
            new MenuItem("Petite", url + "?c=petite"),
            new MenuItem("Pornstar", url + "?c=pornstar"),
            new MenuItem("POV", url + "?c=pov-porn"),
            new MenuItem("Public", url + "?c=public"),
            new MenuItem("Redhead", url + "?c=redhead"),
            new MenuItem("Shemale", url + "?c=shemale"),
            new MenuItem("Sleep", url + "?c=sleep"),
            new MenuItem("Small Tits", url + "?c=small-tits"),
            new MenuItem("Squirt", url + "?c=squirt"),
            new MenuItem("Striptease", url + "?c=striptease"),
            new MenuItem("Students", url + "?c=students"),
            new MenuItem("Swinger", url + "?c=swingers"),
            new MenuItem("Teen", url + "?c=teens"),
            new MenuItem("Threesome", url + "?c=threesome"),
            new MenuItem("Toys", url + "?c=toys"),
            new MenuItem("Uncategorized", url + "?c=uncategorized"),
            new MenuItem("Uniform", url + "?c=uniform"),
            new MenuItem("Vintage", url + "?c=vintage"),
            new MenuItem("Webcam", url + "?c=webcam")
        ];
        menu.push(new MenuItem(
            `Категория: ${submenu.find(i => i.playlist_url.endsWith(`c=${c}`))?.title || 'все'}`,
            'submenu',
            undefined,
            submenu
        ));
        return menu;
    }

    async StreamLinks(host: string, url: string | null): Promise<StreamLinksResult> {
        if (!url) return new StreamLinksResult({}, []);
        const html = await HttpClient.Get(url);
        if (!html) return new StreamLinksResult({}, []);
        const vid = Utils.extract(html, /vid ?= ?'([^']+)'/);
        const hash = Utils.extract(html, /hash ?= ?'([^']+)'/);
        if (!vid || !hash) return new StreamLinksResult({}, []);
        const jsonUrl = `${host}/xhr/video/${vid}?hash=${this.convertHash(hash)}&domain=${host.replace(/^https?:\/\//, '')}&fallback=false&embed=false&supportedFormats=dash,mp4&_=${Math.floor(Date.now()/1000)}`;
        const json = await HttpClient.Get(jsonUrl);
        if (!json) return new StreamLinksResult({}, []);
        const stream_links: { [key: string]: string } = {};
        const regex = /"src":\s*"(https?:\/\/[^/]+\/[^"]+-([0-9]+p)\.mp4)",/g;
        let match;
        while ((match = regex.exec(json)) !== null) {
            stream_links[match[2]] = match[1];
        }
        return new StreamLinksResult(stream_links, this.Playlist(html));
    }

    private convertHash(h: string): string {
        return this.base36(h.substring(0, 8)) + this.base36(h.substring(8, 16)) + this.base36(h.substring(16, 24)) + this.base36(h.substring(24, 32));
    }

    private base36(val: string): string {
        let result = '';
        let value = parseInt(val, 16);
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        while (value > 0) {
            result = chars[value % 36] + result;
            value = Math.floor(value / 36);
        }
        return result || '0';
    }
} 