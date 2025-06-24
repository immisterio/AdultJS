import { HttpClient } from '../engine/HttpClient';
import { Utils } from '../engine/Utils';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';

export class Xvideos {
    public static host: string = 'https://www.xv-ru.com';

    async Invoke(reqUri: string) {
        // Если это страница видео, возвращаем StreamLinks
        if (reqUri.includes('/video')) {
            const html = await HttpClient.Get(reqUri);
            return new StreamLinksUnified(await this.StreamLinks(html), reqUri.includes('&related'));
        }
        else
        {
            // Преобразуем reqUri в параметры поиска, сортировки, категории и страницы
            const urlObj = new URL(reqUri, Xvideos.host);
            const search = urlObj.searchParams.get('search') || '';
            const sort = urlObj.searchParams.get('sort') || '';
            const pg = parseInt(urlObj.searchParams.get('pg') || '1', 10);

            // Формируем URL для запроса HTML
            const url = this.buildUrl(Xvideos.host, search, sort, pg);
            const html = await HttpClient.Get(url);

            return {
                menu: this.Menu(sort),
                list: this.Playlist(html)
            };
        }
    }

    buildUrl(host: string, search: string, sort: string, pg: number): string {
        if (search) {
            return `${host}/?k=${encodeURIComponent(search)}&p=${pg}`;
        } else {
            if (sort === 'top') {
                return `${host}/best/${this.getLastMonth()}/${pg}`;
            } else {
                return `${host}/new/${pg}`;
            }
        }
    }

    getLastMonth(): string {
        const d = new Date();
        d.setMonth(d.getMonth() - 1);
        return d.toISOString().slice(0, 7);
    }

    Playlist(html: string): PlaylistItem[] {
        if (!html) return [];
        const rows = html.split('<div id="video');
        const playlists: PlaylistItem[] = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            var g = /<a href="\/(video[^"]+|search-video\/[^"]+)" title="([^"]+)"/.exec(row);
            if (!g || !g[1] || !g[2]) {
                // <a href="/video.ohpbioo5118/_." target="_blank">Я думал, что не переживу его наказания.</a>
                g = /<a href="\/(video[^"]+)"[^>]+>([^<]+)/.exec(row);
                if (!g || !g[1] || !g[2])
                    continue;
            }
            const qmark = Utils.extract(row, /<span class="video-hd-mark">([^<]+)<\/span>/);
            const duration = Utils.extract(row, /<span class="duration">([^<]+)<\/span>/);
            let img = Utils.extract(row, /data-src="([^"]+)"/);
            if (img) {
                img = img.replace(/\/videos\/thumbs([0-9]+)\//, '/videos/thumbs$1lll/');
                img = img.replace(/\.THUMBNUM\.(jpg|png)$/i, '.1.$1');
                img = img.replace('thumbs169l/', 'thumbs169lll/').replace('thumbs169ll/', 'thumbs169lll/');
            } else {
                img = '';
            }
            let preview = img.replace(/\/thumbs[^/]+\//, '/videopreview/');
            preview = preview.replace(/\/[^/]+$/, '');
            preview = preview.replace(/-[0-9]+$/, '');

            playlists.push(new PlaylistItem(
                g[2],
                `${Xvideos.host}/${g[1]}`,
                img,
                preview + '_169.mp4',
                duration || null,
                qmark || null,
                true,
                true
            ));
        }
        return playlists;
    }

    Menu(sort: string): MenuItem[] {
        const url = Xvideos.host ;
        const menu: MenuItem[] = [
            new MenuItem('Поиск', url, 'search_on')
        ];
        const menusort = new MenuItem(
            `Сортировка: ${sort === 'like' ? 'Понравившиеся' : sort === 'top' ? 'Лучшие' : 'Новое'}`,
            'submenu',
            undefined,
            [
                new MenuItem('Новое', url),
                new MenuItem('Лучшие', url + `?sort=top`)
            ]
        );
        menu.push(menusort);
        return menu;
    }

    async StreamLinks(html: string): Promise<StreamLinksResult> {
        // Поиск прямой ссылки на поток
        const stream_link = Utils.extract(html, /html5player\.setVideoHLS\('([^']+)'\);/);
        if (!stream_link) return new StreamLinksResult({}, []);
        // Поиск рекомендуемых видео
        const related: PlaylistItem[] = [];
        const json = Utils.extract(html, /video_related=([^\n\r]+);window/);
        if (json && json.startsWith('[') && json.endsWith(']')) {
            try {
                const arr = JSON.parse(json);
                for (const r of arr) {
                    if (!r.tf || !r.u || !r.if) continue;
                    let preview = r.if.replace(/\/thumbs[^/]+\//, '/videopreview/');
                    preview = preview.replace(/\/[^/]+$/, '');
                    preview = preview.replace(/-[0-9]+$/, '');
                    related.push(new PlaylistItem(
                        r.tf,
                        `${Xvideos.host}${r.u}`,
                        r.if,
                        preview + '_169.mp4',
                        r.d || '',
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