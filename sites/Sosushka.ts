import { NextHubConfig } from '../models/NextHubConfig';

export const SosushkaConfig: NextHubConfig = {
    enable: true,
    displayname: "Sosushka",
    host: "https://gi.sosushka.vip",
    menu: {
        route: {
            sort: "{host}/{sort}/all/month/page{page}/",
            cat: "{host}/{cat}/page{page}/"
        },
        sort: {
            "Новинки": "",
            "Популярное": "top",
            "Лучшие": "bests"
        },
        categories: {
            "Азиатки": "asian",
            "Анальный секс": "anal",
            "БДСМ": "bdsm",
            "Блондинки": "blonde",
            "Большие жопы": "big_ass",
            "Большие сиськи": "big_tits",
            "Большие члены": "big_dick",
            "Бритые письки": "shaved",
            "Брюнетки": "brunette",
            "Волосатые письки": "hairy",
            "Групповуха": "group",
            "Домашнее порно": "amateur",
            "Жесткий секс": "hardcore",
            "Игрушки": "toys",
            "Камшот": "cumshot",
            "Красивые девушки": "beautiful",
            "Куннилингус": "pussy_licking",
            "Лесбиянки": "lesbiyki",
            "Маленькие девушки": "petite",
            "Маленькие сиськи": "small_tits",
            "Мамочки": "milf",
            "Мастурбация": "masturbation",
            "Межрасовое": "interracial",
            "Минет": "blowjob",
            "Молодые": "teen",
            "Наездницы": "riding",
            "Натуральные сиськи": "natural_tits",
            "Раком": "doggystyle",
            "Русское порно": "russian",
            "Рыжие": "redhead",
            "Секс втроем": "threesome",
            "Соло девушек": "solo_girl",
            "Сперма на лице": "facial",
            "Фистинг": "fisting",
            "Худые девушки": "skinny",
            "Черноволосые": "black-haired"
        }
    },
    list: { uri: "new/page{page}/" },
    search: { uri: "search/{search}/" },
    contentParse: {
        nodes: "//div[@class='thumb']",
        name: { node: ".//p" },
        href: { node: ".//a", attribute: "href" },
        img: { node: ".//img", attribute: "data-src" },
        duration: { node: ".//span[@class='right']" },
        preview: { node: ".//div", attribute: "data-preview-src" }
    },
    view: {
        iframe: {
            pattern: "property=\"ya:ovs:embed_url\" content=\"([^\"]+)\""
        },
        regexMatch: {
            matches: ["720", "480", "240"],
            pattern: "<source src=\"([^\"]+)\" type=\"video/mp4\" size=\"{value}\""
        }
    }
}; 