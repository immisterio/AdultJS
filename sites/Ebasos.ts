import { NextHubConfig } from '../models/NextHubConfig';

export const EbasosConfig: NextHubConfig = {
    enable: true,
    displayname: "Ebasos",
    host: "https://wel.ebasos.club",
    menu: {
        route: {
            sort: "{host}/{sort}/{page}/",
            cat: "{host}/categories/{cat}/{page}/",
            catsort: "{host}/categories/{cat}/top/{page}/"
        },
        sort: {
            "Новое": "",
            "Лучшее": "top-rated"
        },
        categories: {
            "HD": "hd",
            "Азиатки": "aziatki",
            "Анал": "anal",
            "Блондинки": "blondinki",
            "Большие сиськи": "bolshie-siski",
            "Большие члены": "chleny-bolshie",
            "Волосатые": "volosatye",
            "Глубокая глотка": "glubokaya-glotka",
            "Групповое": "gruppovoe",
            "Девушка с девушкой": "lesbos",
            "Зрелые": "zrelye",
            "Инцест порно": "incest-porno",
            "Кастинг": "kasting",
            "Кремпай": "krempay",
            "Любительское": "lyubitelskoe",
            "Межрасовое": "mejrasovoe",
            "Минет": "minet",
            "Молодые": "molodenkie",
            "Ретро порно": "istoricheskoe",
            "Русское порно": "ruporno",
            "Толстые": "tolstye"
        }
    },
    list: { uri: "latest-updates/{page}/" },
    search: { uri: "search/{search}/{page}/" },
    contentParse: {
        nodes: "//div[@id='list_videos_common_videos_list_items']//div[contains(@class, 'item')]",
        name: { node: ".//span[contains(@class, 'title')]" },
        href: { node: ".//a", attribute: "href" },
        img: { node: ".//img[contains(@class,'thumb')]", attribute: "data-original" },
        duration: { node: ".//div[contains(@class, 'duration')]" }
    },
    view: {
        iframe: {
            pattern: "<iframe[^>]+ src=\"([^\"]+)\""
        },
        regexMatch: {
            matches: ["video_alt_url", "video_url"],
            pattern: "{value}:[\\t ]+'([^']+)'"
        }
    }
}; 