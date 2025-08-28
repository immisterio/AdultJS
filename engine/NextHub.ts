import { HttpClient } from '../engine/HttpClient';
import { PlaylistItem } from '../models/PlaylistItem';
import { MenuItem } from '../models/MenuItem';
import { StreamLinksResult, StreamLinksUnified } from '../models/StreamLinksResult';
import { CONFIGS, NextHubConfig } from '../sites/NextHub';

function format(str: string, params: Record<string, string>): string {
    return str.replace(/\{([^}]+)\}/g, (_, k) => params[k] ?? '');
}

function joinUrl(base: string, path: string): string {
    // Remove trailing slash from base and leading slash from path
    const cleanBase = base.replace(/\/+$/, '');
    const cleanPath = path.replace(/^\/+/, '');
    return cleanBase + (cleanPath ? '/' + cleanPath : '');
}

function parseHTML(html: string): Document {
    return new DOMParser().parseFromString(html, 'text/html');
}

function xpathOne(doc: Document, expr: string, ctx?: Node): Node | null {
    return doc.evaluate(expr, ctx || doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function xpathAll(doc: Document, expr: string, ctx?: Node): Node[] {
    const snap = doc.evaluate(expr, ctx || doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    const out: Node[] = [];
    for (let i = 0; i < snap.snapshotLength; i++) out.push(snap.snapshotItem(i) as Node);
    return out;
}

function firstAttr(el: Element | null, attrs?: string[] | string, fallback?: string): string {
    if (!el) return '';
    if (Array.isArray(attrs)) {
        for (const a of attrs) {
            const v = el.getAttribute(a);
            if (v) return v;
        }
        return fallback || '';
    }
    return el.getAttribute(attrs || 'src') || fallback || '';
}

export class NextHub {
    public static host: string = 'nexthub://';

    constructor(private readonly cfgs: NextHubConfig[] = CONFIGS) { }

    private buildListUrl(cfg: NextHubConfig, page: number, sortKey?: string, catSlug?: string): string {
        let route: string;

        // Check if we have category and/or sort parameters
        const hasCategory = catSlug && catSlug.trim() !== '';

        // Automatically detect default sort by checking if sortKey is empty or has empty value in config
        const defaultSortKey = Object.keys(cfg.menu?.sort || {}).find(key => {
            const value = cfg.menu?.sort?.[key];
            return !value || value === '';
        });
        const hasSort = sortKey && sortKey.trim() !== '' && sortKey !== defaultSortKey;

        if (cfg.menu?.route) {
            if (hasCategory && hasSort && cfg.menu.route['catsort']) {
                // Both category and sort specified - use catsort route
                route = cfg.menu.route['catsort'];
            } else if (hasCategory && hasSort && !cfg.menu.route['catsort']) {
                // Both category and sort specified but no catsort route - prioritize category
                route = cfg.menu.route['cat'];
            } else if (hasCategory && cfg.menu.route['cat']) {
                // Only category specified
                route = cfg.menu.route['cat'];
            } else if (hasSort && cfg.menu.route['sort']) {
                // Only sort specified
                route = cfg.menu.route['sort'];
            } else {
                // No category or sort, use list.uri
                route = cfg.list ? cfg.list.uri : '{host}';
            }
        } else {
            // No menu.route, use list.uri
            route = cfg.list ? cfg.list.uri : '{host}';
        }

        const sortSlug = hasSort && cfg.menu?.sort ? cfg.menu.sort[sortKey] : '';

        // Replace {page} in sortSlug if it contains it
        const processedSortSlug = sortSlug.replace(/\{page\}/g, String(page));

        // Always replace {page} placeholder with actual page number
        route = route.replace(/\{page\}/g, String(page));

        let finalUrl = format(route, { host: cfg.host, sort: processedSortSlug || '', cat: catSlug || '', page: String(page) });

        // If the route doesn't start with {host}, we need to join it with the host
        if (!route.startsWith('{host}') && !finalUrl.startsWith('http')) {
            finalUrl = joinUrl(cfg.host, finalUrl);
        }

        return finalUrl;
    }

    private buildSearchUrl(cfg: NextHubConfig, query: string, page: number): string {
        if (!cfg.search) return cfg.host;
        const path = format(cfg.search.uri, { search: encodeURIComponent(query), page: String(page) });
        return joinUrl(cfg.host, path);
    }

    private buildModelUrl(cfg: NextHubConfig, modelUrl: string, page: number): string {
        const route = cfg?.menu?.route?.model;
        const decodedModelUrl = decodeURIComponent(modelUrl);

        // Replace placeholders in the route
        let finalUrl = route
            .replace('{host}', cfg.host)
            .replace('{model}', decodedModelUrl)
            .replace('{page}', String(page));

        return finalUrl;
    }

    private buildMenu(cfg: NextHubConfig, sortKey?: string, catSlug?: string, isViewMode: boolean = false, currentHref?: string): MenuItem[] {
        const menu: MenuItem[] = [];

        // Add search option (only for list/search modes)
        if (!isViewMode) {
            menu.push(new MenuItem("Поиск", `nexthub://${cfg.displayname}?mode=search`, "search_on"));
        }

        // Add related option (only for view mode)
        if (isViewMode && cfg.view?.related && currentHref) {
            // Extract video ID from URL to avoid parameters
            const videoId = currentHref.split('/').pop()?.split('?')[0]?.split('&')[0];
            const cleanHref = `${cfg.host}/${videoId}`;
            const relatedUrl = `nexthub://${cfg.displayname}?mode=related&href=${encodeURIComponent(cleanHref)}`;
            menu.push(new MenuItem("Похожие", relatedUrl));
        }

        // Add sort options as submenu
        if (cfg.menu?.sort) {
            const sortItems: MenuItem[] = [];
            for (const [title, slug] of Object.entries(cfg.menu.sort)) {
                let url = `nexthub://${cfg.displayname}?mode=list&sort=${encodeURIComponent(title)}`;
                // Only add category parameter if catsort route exists
                if (catSlug && cfg.menu?.route?.catsort) {
                    url += `&cat=${encodeURIComponent(catSlug)}`;
                }
                sortItems.push(new MenuItem(title, url));
            }

            // Find current sort name
            const currentSort = sortItems.find(item => item.title === sortKey) || sortItems[0];
            menu.push(new MenuItem("Сортировка: " + currentSort.title, "submenu", undefined, sortItems));
        }

        // Add categories as submenu
        if (cfg.menu?.categories) {
            const catItems: MenuItem[] = [];
            for (const [title, slug] of Object.entries(cfg.menu.categories)) {
                let url = `nexthub://${cfg.displayname}?mode=list&cat=${encodeURIComponent(slug)}`;

                // Only add sort parameter if catsort route exists
                if (cfg.menu?.route?.catsort) {
                    // Automatically detect default sort
                    const defaultSortKey = Object.keys(cfg.menu?.sort || {}).find(key => {
                        const value = cfg.menu?.sort?.[key];
                        return !value || value === '';
                    });

                    if (sortKey && sortKey !== defaultSortKey) {
                        url += `&sort=${encodeURIComponent(sortKey)}`;
                    }
                }
                catItems.push(new MenuItem(title, url));
            }

            // Find current category name
            let currentCatTitle = "Все";
            if (catSlug) {
                const currentCat = Object.entries(cfg.menu.categories).find(([title, slug]) => slug === catSlug);
                if (currentCat) {
                    currentCatTitle = currentCat[0];
                }
            }
            menu.push(new MenuItem("Категория: " + currentCatTitle, "submenu", undefined, catItems));
        }

        return menu;
    }

    private toPlaylist(doc: Document, cfg: NextHubConfig): PlaylistItem[] {
        const parseConfig = cfg.contentParse;
        const nodes = xpathAll(doc, parseConfig.nodes);
        const items: PlaylistItem[] = [];
        for (const n of nodes) {
            const el = n as Element;
            const nameNode = parseConfig.name ? xpathOne(doc, parseConfig.name.node, el) : null;
            const hrefNode = xpathOne(doc, parseConfig.href.node, el) as Element | null;
            const imgNode = parseConfig.img ? xpathOne(doc, parseConfig.img.node, el) as Element | null : null;
            const durNode = parseConfig.duration ? xpathOne(doc, parseConfig.duration.node, el) : null;
            const previewNode = parseConfig.preview ? xpathOne(doc, parseConfig.preview.node, el) as Element | null : null;

            const title = nameNode ? (nameNode.textContent || '').trim() : (hrefNode?.getAttribute('title') || '');
            const href = hrefNode ? (hrefNode.getAttribute(parseConfig.href.attribute || 'href') || '') : '';
            const img = parseConfig.img ? firstAttr(imgNode, (parseConfig.img.attributes as any) || parseConfig.img.attribute || 'src') : '';
            const preview = parseConfig.preview ? firstAttr(previewNode, parseConfig.preview.attribute || 'data-preview') : null;
            const time = durNode ? (durNode.textContent || '').trim() : null;

            if (!href || !title || !img) continue;

            // Ensure href is a complete URL for video viewing
            const videoUrl = href.startsWith('http') ? href : cfg.host.replace(/\/?$/, '/') + href.replace(/^\/?/, '');

            // Check for model information
            let model: { uri: string; name: string } | null = null;
            if (parseConfig.model) {
                const modelNameNode = parseConfig.model.name ? xpathOne(doc, parseConfig.model.name.node, el) : null;
                const modelHrefNode = parseConfig.model.href ? xpathOne(doc, parseConfig.model.href.node, el) as Element | null : null;

                if (modelNameNode && modelHrefNode && parseConfig.model.href) {
                    const modelName = (modelNameNode.textContent || '').trim();
                    const modelHref = modelHrefNode.getAttribute(parseConfig.model.href.attribute || 'href') || '';

                    if (modelName && modelHref) {
                        model = {
                            uri: `nexthub://${cfg.displayname.toLowerCase()}?mode=model&model=${encodeURIComponent(modelHref)}`,
                            name: modelName
                        };
                    }
                }
            }

            items.push(new PlaylistItem(
                title,
                videoUrl,
                img,
                preview,
                time,
                null,
                true,
                cfg.view?.related || false,
                model
            ));
        }
        return items;
    }

    private async extractStreams(html: string, cfg: NextHubConfig): Promise<StreamLinksResult> {
        const streams: Record<string, string> = {};

        // Check if we need to extract iframe first
        if (cfg.view?.iframe?.pattern) {
            const iframeRx = new RegExp(cfg.view.iframe.pattern, 'g');
            const iframeMatch = iframeRx.exec(html);
            if (iframeMatch && iframeMatch[1]) {
                const iframeUrl = iframeMatch[1];
                // Make iframe URL absolute if it's relative
                const absoluteIframeUrl = iframeUrl.startsWith('http') ? iframeUrl : cfg.host + iframeUrl;
                // Get content from iframe URL
                html = await HttpClient.Get(absoluteIframeUrl);
            }
        }

        if (!cfg.view?.regexMatch?.pattern) {
            return new StreamLinksResult(streams, []);
        }

        // Get matches array or use default
        const matches = cfg.view.regexMatch.matches || [''];

        // Process each match value
        for (const matchValue of matches) {
            let pattern = cfg.view.regexMatch.pattern;

            // Replace {value} placeholder with current match value
            if (pattern.includes('{value}')) {
                pattern = pattern.replace('{value}', matchValue);
            }

            const rx = new RegExp(pattern, 'g');
            let m: RegExpExecArray | null;
            let i = 0;
            while ((m = rx.exec(html))) {
                const url = m[1];
                if (!url) continue;

                // Apply format if specified
                let finalUrl = url;
                if (cfg.view.regexMatch.format) {
                    finalUrl = cfg.view.regexMatch.format
                        .replace('{host}', cfg.host)
                        .replace('{value}', url);
                }

                const key = matchValue + (i ? '_' + i : '');
                streams[key] = finalUrl;
                i++;
            }
        }

        // Extract related videos using contentParse from the same page
        const related: PlaylistItem[] = [];
        if (cfg.view?.related) {
            const doc = parseHTML(html);
            related.push(...this.toPlaylist(doc, cfg));
        }

        return new StreamLinksResult(streams, related);
    }

    async Invoke(reqUri: string) {
        const uri = new URL(reqUri);
        const site = uri.hostname || uri.pathname.replace(/^\//, '') || reqUri.replace('nexthub://', '').split('?')[0];

        const cfg = this.cfgs.find(c => c.displayname.toLowerCase() === site.toLowerCase());

        if (!cfg) return 'unknown nexthub site';

        console.log(`NextHub: Invoke ${reqUri}`);

        const mode = uri.searchParams.get('mode') || 'list';
        if (mode === 'view' || mode === 'related') {
            const href = uri.searchParams.get('href');
            if (!href) return 'no href param';

            const decodedHref = decodeURIComponent(href);
            let cleanUrl = decodedHref.replace('&related?pg=1', '');

            const html = await HttpClient.Get(cleanUrl);
            const streamResult = await this.extractStreams(html, cfg);

            return new StreamLinksUnified(streamResult, mode === 'related' || decodedHref.includes('&related'));
        }
        else if (mode === 'model') {
            const modelUrl = uri.searchParams.get('model');
            if (!modelUrl) return 'no model param';

            const page = Number(uri.searchParams.get('pg') || '1');
            const url = this.buildModelUrl(cfg, modelUrl, page);
            const html = await HttpClient.Get(url);
            const doc = parseHTML(html);

            return {
                menu: this.buildMenu(cfg, undefined, undefined, false),
                list: this.toPlaylist(doc, cfg)
            };
        }
        else if (mode === 'search') {
            const searchParams = uri.searchParams.getAll('search');
            let q = searchParams.find(param => param.trim() !== '') || '';

            const page = Number(uri.searchParams.get('pg') || '1');

            const url = this.buildSearchUrl(cfg, q, page);
            const html = await HttpClient.Get(url);
            const doc = parseHTML(html);
            return {
                menu: this.buildMenu(cfg, undefined, undefined, false),
                list: this.toPlaylist(doc, cfg)
            };
        }
        else {
            const sortKey = uri.searchParams.get('sort') || '';
            const catSlug = uri.searchParams.get('cat') || '';
            const page = Number(uri.searchParams.get('pg') || '1');

            const url = this.buildListUrl(cfg, page, sortKey, catSlug);
            const html = await HttpClient.Get(url);
            const doc = parseHTML(html);
            return {
                menu: this.buildMenu(cfg, sortKey, catSlug, false),
                list: this.toPlaylist(doc, cfg)
            };
        }
    }
} 