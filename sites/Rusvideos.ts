import { NextHubConfig } from '../models/NextHubConfig';

export const RusvideosConfig: NextHubConfig = {
    enable: true,
    displayname: "Rusvideos",
    host: "https://sex.rusvideos.art",
    menu: {
        route: {
            sort: "{host}/{page}?sortirovka={sort}",
            cat: "{host}/{cat}/{page}"
        },
        sort: {
            "Новинки": "",
            "Популярнаe": "popularnoe"
        },
        categories: {
            "Зрелые": "zrelye",
            "Молодые": "molodye",
            "Бабули": "babuli",
            "Зрелые с молодыми": "zrelye-s-molodymi",
            "Инцест": "incest",
            "Мама и сын": "mama-i-syn",
            "Анал": "anal",
            "Минет": "minet",
            "Кунилингус": "kunilingus",
            "Двойное проникновение": "dvoynoe-proniknovenie",
            "Толстые": "tolstye",
            "Худенькие": "xudenkie",
            "Крупным планом": "krupnym-planom",
            "Лесбиянки": "lesbians",
            "Мастурбация": "masturbaciya",
            "Секс-игрушки": "seks-igrushki",
            "Соло": "solo",
            "Групповухи": "gruppovuxi",
            "Пикап": "pikap",
            "Кастинги": "kastingi",
            "На улице": "na-ulice",
            "Рогоносцы": "rogonoscy-izmena",
            "Спящие": "spyashhie",
            "Большие сиськи": "bolshie-siski",
            "Большие члены": "bolshoj-chlen",
            "Большие жопы": "bolshie-zhopy",
            "Сперма и камшоты": "sperma-i-kamshoty",
            "Блондинки": "blondinki",
            "Брюнетки": "bryunetki",
            "Рыжие": "redhead",
            "Целки": "celki",
            "В чулках": "v-chulkax-kolgotkax",
            "Нижнее белье": "nizhnee-bele",
            "В униформе": "v-uniforme",
            "Фетиш ногами": "fetish-nogami",
            "БДСМ и извращения": "bdsm-i-izvrashheniya",
            "Любительское": "chastnoe-lyubitelskoe",
            "От первого лица": "ot-pervogo-lica",
            "Волосатые щели": "volosatye-shheli",
            "Бритая пизда": "britaya-pizda",
            "Вебкам": "vebkam",
            "Красивое порно": "krasivoe-porno",
            "Пьяный секс": "pyanyj-seks",
            "Жесткое": "zhestkoe",
            "По принуждению": "po-prinuzhdeniyu",
            "Русские заграницей": "russkie-zagranicej"
        }
    },
    list: { uri: "{page}/" },
    search: { uri: "poisk/{page}?q={search}" },
    contentParse: {
        nodes: "//div[@class='thumb wide']",
        name: { node: ".//div[@class='thumb-title']" },
        href: { node: ".//a", attribute: "href" },
        img: { node: ".//img", attributes: ["data-original", "src"] },
        duration: { node: ".//span[@class='ttime']" },
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