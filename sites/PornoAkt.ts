import { NextHubConfig } from '../models/NextHubConfig';

export const PornoAktConfig: NextHubConfig = {
    enable: true,
    displayname: "PornoAkt",
    host: "https://a.pornoakt.club",
    menu: {
        route: {
            cat: "{host}/{cat}/page/{page}/"
        },
        categories: {
            "Порно в HD": "hd",
            "Анальный секс": "anal",
            "Азиаты": "aziaty",
            "БДСМ": "bdsm",
            "Большая грудь": "bolshaja-grud",
            "Большие члены": "bolshie-chleny",
            "Групповое порно": "gruppovoe-porno",
            "Домашнее порно": "domashnee-porno",
            "Задницы": "zadnicy",
            "Зрелые": "zrelye",
            "Изнасилование": "iznasilovanie",
            "Инцест": "incest",
            "Мамаши": "mamashi",
            "Массаж": "massazh",
            "Мастурбация": "masturbacija",
            "Межрассовое порно": "mezhrassovoe-porno",
            "Минет": "minet",
            "На природе": "na-prirode",
            "Русское порно": "russkoe-porno",
            "Скрытая камера": "skrytaja-kamera",
            "Сквирт": "skvirt",
            "Стриптиз": "striptiz",
            "Трансвеститы": "transvestity",
            "Хентай": "hentai",
            "Фистинг": "fisting",
            "Черные": "chernye"
        }
    },
    list: {
        uri: "page/{page}/"
    },
    search: {
        uri: "index.php?do=search&subaction=search&search_start={page}&full_search=0&result_from=25&story={search}"
    },
    contentParse: {
        nodes: "//article[contains(@class, 'shortstory')]",
        name: {
            node: ".//h2//a"
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
            node: ".//div[@class='video_time']"
        }
    },
    view: {
        related: true,
        nodeFile: {
            node: "//li[@data-type='m4v']",
            attribute: "data-url"
        }
    }
}; 