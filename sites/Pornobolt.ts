import { NextHubConfig } from '../models/NextHubConfig';

export const PornoboltConfig: NextHubConfig = {
    enable: true,
    displayname: "Pornobolt",
    host: "https://ru.pornobolt.li",
    menu: {
        route: {
            sort: "{host}/{page}?sort={sort}",
            cat: "{host}/{cat}/{page}"
        },
        sort: {
            "Новинки": "",
            "Популярнаe": "mv"
        },
        categories: {
            "Русские": "russkoe-porno",
            "Инцест": "incest",
            "Зрелые": "zrelye",
            "Пикап": "pickup",
            "Кастинг": "kasting",
            "Взрослые с молодыми": "vzroslye-s-molodymi",
            "Молоденькие": "molodenkie",
            "Любительское": "lyubitelskoe",
            "Групповуха": "gruppovuha",
            "Анал": "anal",
            "Азиатки": "aziatki",
            "Латинки": "latinki",
            "Межрассовый секс": "mezhrassovyj-seks",
            "Толстые": "tolstye",
            "Сперма": "sperma",
            "Игрушки": "igrushki",
            "Красотки": "krasotki",
            "Лесбиянки": "lesbiyanki",
            "Минет": "minet",
            "Блондинки": "blondinki",
            "Брюнетки": "bryunetki",
            "Рыжие": "ryzhie",
            "Фетиш и БДСМ": "fetish-i-bdsm",
            "Большие сиськи": "bolshie-siski",
            "Большой член": "bolshoj-chlen",
            "Мастурбация": "masturbaciya",
            "Волосатые": "volosatye",
            "Двойное проникновение": "dvojnoe-proniknovenie",
            "На улице": "na-ulice",
            "Жесткий секс": "zhestkij-seks"
        }
    },
    list: { uri: "{page}/" },
    search: { uri: "search/{search}/{page}" },
    contentParse: {
        nodes: "//div[@class='media-obj widethumb']",
        name: { node: ".//p" },
        href: { node: ".//a", attribute: "href" },
        img: { node: ".//img", attributes: ["data-original", "src"] },
        duration: { node: ".//span[@itemprop='duration']" },
        preview: { node: ".//img", attribute: "data-video" }
    },
    view: {
        related: true,
        nodeFile: {
            node: "//meta[@property='ya:ovs:content_url']",
            attribute: "content"
        }
    }
}; 