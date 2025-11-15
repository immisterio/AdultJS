import { NextHubConfig } from '../models/NextHubConfig';

export const JopaOnlineConfig: NextHubConfig = {
    enable: true,
    displayname: "JopaOnline",
    host: "https://jopaonline.mobi",
    menu: {
        route: {
            sort: "{host}/{sort}/{page}",
            cat: "{host}/categories/{cat}/{page}",
            catsort: "{host}/categories/{cat}/{sort}/{page}"
        },
        sort: {
            "Новинки": "",
            "Топ рейтинга": "toprated",
            "Популярнаe": "popular"
        },
        categories: {
            "Мамки": "mamki",
            "Русское": "russkoe",
            "Жесткое": "zhestkoe",
            "Зрелые": "zrelye",
            "Измена": "izmena",
            "Красотки": "krasotki",
            "Домашнее": "domashnee",
            "Большие члены": "big-cock",
            "Групповое": "gruppovoe",
            "Анал": "anal",
            "Студенты": "studenty",
            "Азиатки": "asian",
            "Красивый секс": "krasiviy-seks",
            "Большие сиськи": "bolshie-siski",
            "Лесбиянки": "lesbiyanki",
            "Жопы": "zhopy",
            "Двойное проникновение": "dvoynoe-proniknovenie",
            "Молодые": "molodye",
            "Пикап": "pickap",
            "Мастурбация": "masturbation",
            "В ванной": "v-vannoi",
            "Негры": "s-negrami",
            "Мулатки": "mulatki",
            "Худые": "hudenkie",
            "Чулки": "stockings",
            "Раком": "rakom",
            "Минет": "minet",
            "Рыжие": "redhead",
            "Блондинки": "blonde",
            "Брюнетки": "bryunetki",
            "Межрасовое": "mejrassovyy"
        }
    },
    list: {
        uri: "{page}"
    },
    search: {
        uri: "search/{search}/{page}"
    },
    contentParse: {
        nodes: "//div[@class='th']",
        name: {
            node: ".//p"
        },
        href: {
            node: ".//a",
            attribute: "href"
        },
        img: {
            node: ".//img",
            attribute: "src"
        },
        duration: {
            node: ".//div[@class='th-duration']"
        },
        preview: {
            node: ".//img",
            attribute: "data-preview"
        }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["url3", "url2", "url"],
            pattern: "video_alt_{value}:[\\t ]+'([^']+)'"
        }
    }
}; 