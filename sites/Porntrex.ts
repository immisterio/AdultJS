import { NextHubConfig } from '../models/NextHubConfig';

export const PorntrexConfig: NextHubConfig = {
    enable: true,
    displayname: "Porntrex",
    host: "https://www.porntrex.com",
    menu: {
        route: {
            sort: "{host}/{sort}/?page={page}",
            cat: "{host}/categories/{cat}/?page={page}"
        },
        sort: {
            "Новинки": "",
            "Популярное": "most-popular",
            "Топ рейтинга": "top-rated",
            "Длинные": "longest"
        },
        categories: {
            "3D": "3d",
            "Аматорское": "amateur",
            "Анальное": "anal",
            "Азиатки": "asian",
            "BBW": "bbw",
            "Большие попы": "big-ass",
            "Большие члены": "big-dick",
            "Большие сиськи": "big-tits",
            "Блондинки": "blonde",
            "Минет": "blowjob",
            "Брюнетки": "brunette",
            "Кримпай": "creampie",
            "Сперма": "cumshot",
            "Эбони": "ebony",
            "Фетиш": "fetish",
            "Гангбанг": "gangbang",
            "Ручная работа": "handjob",
            "Хардкор": "hardcore",
            "Межрасовое": "interracial",
            "Латинки": "latina",
            "Лесби": "lesbian",
            "МИЛФ": "milf",
            "Оргия": "orgy",
            "POV": "pov",
            "Публичное": "public",
            "Рыжие": "redhead",
            "Транс": "shemale",
            "Тин": "teen",
            "Трое": "threesome",
            "Винтаж": "vintage"
        }
    },
    list: { uri: "?page={page}", firstpage: "" },
    search: { uri: "search/{search}/?page={page}" },
    contentParse: {
        nodes: "//div[contains(@class,'video-item') or contains(@class,'video-card')]",
        name: { node: ".//a[contains(@class,'title') or contains(@class,'video-title')]" },
        href: { node: ".//a[@href]", attribute: "href" },
        img: { node: ".//img", attributes: ["data-src", "data-original", "src"] },
        duration: { node: ".//span[contains(@class,'duration') or contains(@class,'time')]" }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["2160", "1440", "1080", "720", "480", "360"],
            pattern: "\"(https?:\\/\\/[^\\\"']+{value}p?[^\\\"']*\\.mp4)\""
        }
    }
};
