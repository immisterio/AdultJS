import { HttpClient } from '../engine/HttpClient';
import { Utils } from '../engine/Utils';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';

export class Spankbang {
    public static host: string = 'https://ru.spankbang.com';

    async Invoke(reqUri: string) {
        if (/\/video\//.test(reqUri)) {
            const html = await HttpClient.Get(reqUri);
            return new StreamLinksUnified(await this.StreamLinks(html), reqUri.includes('&related'));
        }
        else
        {
            const urlObj = new URL(reqUri, Spankbang.host);
            const search = urlObj.searchParams.get('search') || '';
            const sort = urlObj.searchParams.get('sort') || '';
            const pg = parseInt(urlObj.searchParams.get('pg') || '1', 10);

            const url = this.buildUrl(Spankbang.host, search, sort, pg);
            const html = await HttpClient.Get(url);

            return {
                menu: this.Menu(sort),
                list: this.Playlist(html)
            };
        }
    }

    buildUrl(host: string, search: string, sort: string, pg: number): string {
        let url = `${host}/`;
        if (search) {
            url += `s/${encodeURIComponent(search)}/${pg}/`;
        } else {
            url += `${sort || 'new_videos'}/${pg}/`;
            if (sort === 'most_popular')
                url += '?p=m';
        }
        return url;
    }

    Playlist(html: string): PlaylistItem[] {
        if (!html) return [];
        const rows = html.split('class="video-item"');
        const playlists: PlaylistItem[] = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const g = /<a href="\/([^\"]+)" title="([^"]+)"/.exec(row);
            if (!g || !g[1] || !g[2]) continue;
            const quality = Utils.extract(row, /<span class="video-badge h">([^<]+)<\/span>/);
            const duration = Utils.extract(row, /<span class="video-badge l">([^<]+)<\/span>/);
            let img = Utils.extract(row, /data-src="([^"]+)"/);
            if (img) img = img.replace(/\/w:[0-9]00\//, '/w:300/');
            else img = '';
            const preview = Utils.extract(row, /data-preview="([^"]+)"/);
            playlists.push(new PlaylistItem(
                g[2],
                `${Spankbang.host}/${g[1]}`,
                img,
                preview || null,
                duration || null,
                quality || null,
                true,
                true
            ));
        }
        return playlists;
    }

    Menu(sort: string): MenuItem[] {
        const host = Spankbang.host + '/sbg';
        return [
            new MenuItem('Поиск', host, 'search_on'),
            new MenuItem(
                `Сортировка: ${!sort ? 'новое' : sort}`,
                'submenu',
                undefined,
                [
                    new MenuItem('Новое', host),
                    new MenuItem('Трендовое', host + '?sort=trending_videos'),
                    new MenuItem('Популярное', host + '?sort=most_popular')
                ]
            )
        ];
    }

    async StreamLinks(html: string): Promise<StreamLinksResult> {
        const stream_links: { [key: string]: string } = {};
        const regex = /'([0-9]+)(p|k)': ?\['(https?:\/\/[^']+)'/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
            let q = match[2] === 'k' ? 2160 : parseInt(match[1], 10);
            stream_links[`${q}p`] = match[3];
        }
        return new StreamLinksResult(stream_links, this.Playlist(html));
    }
} 