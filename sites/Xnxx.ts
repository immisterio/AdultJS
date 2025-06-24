import { HttpClient } from '../engine/HttpClient';
import { Utils } from '../engine/Utils';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';

export class Xnxx {
    public static host: string = 'https://www.xnxx-ru.com';

    async Invoke(reqUri: string) {
        if (reqUri.includes('/video-')) {
            const html = await HttpClient.Get(reqUri);
            return new StreamLinksUnified(await this.StreamLinks(html), reqUri.includes('&related'));
        }
        else
        {
            const urlObj = new URL(reqUri, Xnxx.host);
            const search = urlObj.searchParams.get('search') || '';
            const pg = parseInt(urlObj.searchParams.get('pg') || '1', 10);

            const url = this.buildUrl(Xnxx.host, search, pg);
            const html = await HttpClient.Get(url);

            return {
                menu: this.Menu(),
                list: this.Playlist(html)
            };
        }
    }

    buildUrl(host: string, search: string, pg: number): string {
        if (search) {
            return `${host}/search/${encodeURIComponent(search)}/${pg}`;
        } else {
            // best за прошлый месяц
            const d = new Date();
            d.setMonth(d.getMonth() - 1);
            const ym = d.toISOString().slice(0, 7);
            return `${host}/best/${ym}/${pg}`;
        }
    }

    Playlist(html: string): PlaylistItem[] {
        if (!html) return [];
        const rows = html.split('<div id="video_');
        const playlists: PlaylistItem[] = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const g = /<a href="\/(video-[^"]+)" title="([^"]+)"/.exec(row);
            const quality = Utils.extract(row, /<span class="superfluous"> - <\/span>([^<]+)<\/span>/);
            if (!g || !g[1] || !g[2]) continue;
            const duration = Utils.extract(row, /<\/span>([^<]+)<span class="video-hd">/);
            let img = Utils.extract(row, /data-src="([^"]+)"/);
            if (img) img = img.replace('.THUMBNUM.', '.1.');
            else img = '';
            let preview = img.replace(/\/thumbs[^/]+\//, '/videopreview/');
            preview = preview.replace(/\/[^/]+$/, '');
            preview = preview.replace(/-[0-9]+$/, '');
            playlists.push(new PlaylistItem(
                g[2],
                `${Xnxx.host}/${g[1]}`,
                img,
                preview + '_169.mp4',
                duration || null,
                quality || null,
                true,
                true
            ));
        }
        return playlists;
    }

    Menu(): MenuItem[] {
        const url = Xnxx.host + '/xnx';
        return [
            new MenuItem('Поиск', url, 'search_on')
        ];
    }

    async StreamLinks(html: string): Promise<StreamLinksResult> {
        const stream_link = Utils.extract(html, /html5player\.setVideoHLS\('([^']+)'\);/);
        if (!stream_link) return new StreamLinksResult({}, []);
        // Поиск рекомендуемых видео
        const related: PlaylistItem[] = [];
        const json = Utils.extract(html, /video_related=([^\n\r]+);window/);
        if (json && json.startsWith('[') && json.endsWith(']')) {
            try {
                const arr = JSON.parse(json);
                for (const r of arr) {
                    if (!r.tf || !r.u || !r.i) continue;
                    related.push(new PlaylistItem(
                        r.tf,
                        `${Xnxx.host}${r.u}`,
                        r.i,
                        null,
                        '',
                        null,
                        true,
                        true
                    ));
                }
            } catch { }
        }
        return new StreamLinksResult({ auto: stream_link }, related);
    }
} 