import { HttpClient } from '../engine/HttpClient';
import { Utils } from '../engine/Utils';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';

export class Chaturbate {
    public static host: string = 'https://chaturbate.com';

    async Invoke(reqUri: string) {
        const urlObj = new URL(reqUri, Chaturbate.host);

        if (reqUri.includes('baba=')) {
            return new StreamLinksUnified(await this.StreamLinks(urlObj.searchParams.get('baba') || ''), false);
        }
        else
        {
            const sort = urlObj.searchParams.get('sort') || '';
            const pg = parseInt(urlObj.searchParams.get('pg') || '1', 10);
            const url = this.buildUrl(Chaturbate.host, sort, pg);
            const html = await HttpClient.Get(url);

            return {
                menu: this.Menu(sort),
                list: this.Playlist(html)
            };
        }
    }

    buildUrl(host: string, sort: string, pg: number): string {
        let url = host + '/api/ts/roomlist/room-list/?enable_recommendations=false&limit=90';
        if (sort) url += `&genders=${sort}`;
        if (pg > 1) url += `&offset=${pg * 90}`;
        return url;
    }

    Playlist(html: string): PlaylistItem[] {
        if (!html) return [];
        const rows = html.split('display_age');
        const playlists: PlaylistItem[] = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row.includes('"current_show":"public"')) continue;
            const baba = Utils.extract(row, /"username":"([^"]+)"/);
            if (!baba) continue;
            let img = Utils.extract(row, /"img":"([^"]+)"/);
            if (!img) continue;
            img = img.replace(/\\/g, '');
            playlists.push(new PlaylistItem(
                baba.trim(),
                `${Chaturbate.host}?baba=${baba.trim()}`,
                img,
                null,
                null,
                null,
                true,
                false
            ));
        }
        return playlists;
    }

    Menu(sort: string): MenuItem[] {
        const host = Chaturbate.host + '/chu';
        const sortmenu = [
            new MenuItem('Лучшие', host),
            new MenuItem('Девушки', host + '?sort=f'),
            new MenuItem('Пары', host + '?sort=c'),
            new MenuItem('Парни', host + '?sort=m'),
            new MenuItem('Транссексуалы', host + '?sort=t')
        ];
        const sortTitle = sortmenu.find(i => i.playlist_url.endsWith(`=${sort}`))?.title || 'Лучшие';
        return [
            new MenuItem(`Сортировка: ${sortTitle}`, 'submenu', undefined, sortmenu)
        ];
    }

    async StreamLinks(baba: string): Promise<StreamLinksResult> {
        if (!baba) return new StreamLinksResult({}, []);
        const html = await HttpClient.Get(`${Chaturbate.host}/${baba}/`);
        const hls = Utils.extract(html, /(https?:\/\/[^ ]+\/playlist\.m3u8)/);
        if (!hls) return new StreamLinksResult({}, []);
        return new StreamLinksResult({ auto: hls.replace(/\\u002D/g, '-').replace(/\\/g, '') }, []);
    }
} 