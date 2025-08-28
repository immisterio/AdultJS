import { NextHubConfig } from '../models/NextHubConfig';

export const Porno666Config: NextHubConfig = {
    enable: true,
    displayname: "Porno666",
    host: "https://wwwp.porno666.news",
    menu: {
        route: {
            cat: "{host}/categories/{cat}/{page}/",
            sort: "{host}/{sort}"
        },
        sort: {
            "Новинки": "",
            "Лучшее": "top-rated/{page}/",
            "Популярнаe": "most-popular/{page}/"
        },
        categories: {
            "Азиатки": "aziatki",
            "Анал": "analnyy-seks",
            "БДСМ": "bdsm",
            "Блондинки": "blondinki",
            "Большие сиськи": "bolshie-siski",
            "Большие члены": "bolshie-chleny",
            "Брюнетки": "bryunetki",
            "Волосатые": "volosatye",
            "Групповое": "gruppovoe",
            "Домашнее порно": "domashnee-i-chastnoe",
            "Жены": "jeny",
            "Жесткое": "jestkoe",
            "Жопы": "jopy",
            "Зрелые": "zrelye",
            "Игрушки": "igrushki",
            "Измена": "izmena",
            "Кастинг": "kasting",
            "Мамки": "mamki",
            "Массаж": "massaj",
            "Мастурбация": "masturbaciya",
            "Минет": "minet",
            "Молодые": "molodye",
            "Не постановочное": "ne-postanovochnoe",
            "Негры": "negry",
            "Оргазмы": "orgazmy",
            "Пикап": "pikap",
            "Порно ВК": "porno-vk",
            "Порно фильмы": "porno-film",
            "Пьяные": "pyanye",
            "Раком": "rakom",
            "Русское порно": "russkoe",
            "Рыжие": "ryjie",
            "Свингеры": "svingery",
            "Секс втроем": "seks-vtroem",
            "Сперма": "sperma",
            "Спящие": "spyashchie",
            "Страпон": "strapon",
            "Студенты": "studenty",
            "Толстые": "tolstye",
            "Худые": "hudye",
            "Чулки и колготки": "chulki-i-kolgotki",
            "Японское": "yaponskoe"
        }
    },
    list: { uri: "latest-updates/{page}/" },
    search: { uri: "search/{search}/{page}/" },
    contentParse: {
        nodes: "//div[@class='item trailer']",
        name: { node: ".//strong" },
        href: { node: ".//a", attribute: "href" },
        img: { node: ".//img", attribute: "data-original" },
        duration: { node: ".//div[@class='duration']" },
        preview: { node: ".//img", attribute: "data-preview" }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["url3", "url2", "url"],
            pattern: "video_alt_{value}:[\\t ]+'([^']+)'"
        }
    }
}; 