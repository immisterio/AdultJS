import { NextHubConfig } from '../models/NextHubConfig';

export const GayPornTubeConfig: NextHubConfig = {
    enable: true,
    displayname: "GayPornTube",
    host: "https://www.gayporntube.com",
    menu: {
        route: {
            sort: "{host}/{sort}/page{page}.html"
        },
        sort: {
            "Новые": "most-recent",
            "Сейчас смотрят": "random",
            "Топ по рейтингу": "top-rated",
            "Избранные": "top-favorites",
            "Просматриваемые": "most-viewed",
            "Обсуждаемые": "most-discussed",
            "Длинные": "longest"
        }
    },
    list: {
        uri: "page{page}.html"
    },
    search: {
        uri: "search/videos/{search}/page{page}.html"
    },
    contentParse: {
        nodes: "//div[contains(@class,'item') and contains(@class,'item-col')]",
        name: {
            node: ".//a[contains(@class,'title')]"
        },
        href: {
            node: ".//a[contains(@class,'title')]",
            attribute: "href"
        },
        img: {
            node: ".//img",
            attributes: ["data-src", "src"]
        },
        preview: {
            node: ".//img",
            attribute: "data-preview"
        },
        duration: {
            node: ".//div[contains(@class,'duration')]"
        }
    },
    view: {
        related: true,
        regexMatch: {
            pattern: 'src="([^"]+)" type="video/mp4"'
        }
    }
}; 