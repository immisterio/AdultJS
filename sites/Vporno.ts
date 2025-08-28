import { NextHubConfig } from '../models/NextHubConfig';

export const VpornoConfig: NextHubConfig = {
    enable: true,
    displayname: "Vporno",
    host: "https://vv.vporno.video",
    menu: {
        route: {
            cat: "{host}/{cat}&{page}"
        },
        categories: {
            "Кастинг": "kasting",
            "Итальянки": "italqyanki",
            "Зрелые с молодыми": "zrelyee_s_molodymi",
            "Игрушки": "igrushki",
            "Кончает внутрь": "konchaet_vnutrq",
            "Кореянки": "koreyanki",
            "Сборник": "sbornik",
            "Большие члены": "bolqshie_chleny",
            "Милашки": "milashki",
            "Сквиртинг": "skvirting",
            "Хентай": "hentaj",
            "Англичанки": "anglichanki",
            "Девушка дрочит парню": "devushka_drochit_parnyu",
            "Азиатки": "aziatki",
            "Лижут письку": "lizhut_pisqku",
            "Чернокожие": "chernokozhie",
            "Жесткое": "zhestkoe",
            "Звезды": "zvezdy",
            "Мультфильмы": "mulqtfilqmy",
            "Вечеринки": "vecherinki",
            "Транссексуалы": "transseksualy",
            "HD порно": "hd_porno",
            "Смешные": "smeshnyee",
            "Косплей": "kosplej",
            "Мастурбация": "masturbaciya",
            "Чешки": "cheshki",
            "Курящие": "kuryawie",
            "Приколы": "prikoly",
            "Зрелые": "zrelyee",
            "Минет": "minet"
        }
    },
    list: { uri: "page/{page}" },
    search: { uri: "search/?word={search}&page={page}" },
    contentParse: {
        nodes: "//div[@class='col-xs-6 col-sm-6 col-md-4 col-lg-4']",
        name: { node: ".//h3" },
        href: { node: ".//a", attribute: "href" },
        img: { node: ".//img", attribute: "src" },
        duration: { node: ".//span[@class='time']" }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["720", "480", "360", "240"],
            pattern: "href=\"(/down/{value}/[^\"]+)\"",
            format: "{host}{value}"
        }
    }
}; 