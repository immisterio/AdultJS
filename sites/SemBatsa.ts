import { NextHubConfig } from '../models/NextHubConfig';

export const SemBatsaConfig: NextHubConfig = {
    enable: true,
    displayname: "SemBatsa",
    host: "https://sem.batsa.pro",
    menu: {
        route: {
            sort: "{host}/{sort}/monthly?page={page}",
            cat: "{host}/{cat}?page={page}"
        },
        sort: {
            "Новое": "",
            "Топ рейтинга": "top-rated",
            "Топ просмотров": "most-popular"
        },
        categories: {
            "Разговоры на русском": "razgovory-na-russkom",
            "Порно молодых": "porno-molodyih",
            "Русское порно": "russkoe-porno",
            "Порно мамки": "porno-mamki",
            "Анальное порно": "analnoe-porno",
            "Измены": "izmenyi",
            "Эротика": "erotic",
            "Украинское порно": "ukrainskoe-porno",
            "Групповуха": "gruppovuha",
            "Большие сиськи": "bolshie-siski",
            "Семейное": "semeynoe",
            "Жесткое порно": "jestkoe-porno",
            "Учителя": "uchitelya",
            "Массаж": "massaj",
            "Большие члены": "bolshie-chleny",
            "Бабули и дедули": "babuli-i-deduli",
            "Азиатки": "aziatki",
            "Зрелые дамы": "zrelyie-damy",
            "Домашнее порно": "domashnee-porno",
            "Сперма на лицо": "sperma-na-litso",
            "Секс по принуждению": "seks-po-prinujdeniyu",
            "Лишение невинности": "lishenie-nevinnosti",
            "В публичных местах": "v-publichnyih-mestah",
            "Трах в два члена": "trah-v-dva-chlena",
            "Порно от первого лица": "porno-ot-pervogo-litsa",
            "Сквирт": "skvirt",
            "Арабское порно": "arabskoe-porno",
            "Негры": "negryi",
            "Волосатые киски": "volosaty-kiski",
            "Глубокий минет": "glubokiy-minet",
            "Нежное порно": "nejnoe-porno",
            "Пьяные": "pyany",
            "Толстухи": "tolstuhi",
            "Мастурбация": "masturbatsiya",
            "БДСМ порно": "bdsm-porno",
            "Короткие видео": "korotkie-video",
            "Порно фильмы": "porno-filmy",
            "Порнозвезды": "pornozvedyi",
            "Секс игрушки": "seks-igrushki",
            "Трах на работе": "trah-na-rabote",
            "Порно вечеринки": "porno-vecherinki",
            "Порно кастинги": "porno-kastingi",
            "Свингеры": "svingery",
            "Фистинг": "fisting",
            "Женское доминирование": "jenskoe-dominirovanie",
            "Латиночки": "latinochki",
            "Рыжие малышки": "ryijie-malyishki",
            "Маленькие сиськи": "malenkie-siski",
            "Брюнетки": "bryunetki",
            "Секс на улице": "seks-na-ulitse",
            "Татуировки": "tatuirovki",
            "Блондинки": "blondinki",
            "Студенты": "studenty",
            "Фетиш секс": "fetish-seks",
            "Межрассовое порно": "mejrassovoe-porno",
            "Лесбухи": "lesbuhi",
            "Секс втроем": "seks-vtroem",
            "Вылизывание писек": "vyilizyivanie-pisek",
            "Крупным планом": "krupnyim-planom",
            "Дрочка": "drochka"
        }
    },
    list: { uri: "?page={page}" },
    search: { uri: "search?q={search}" },
    contentParse: {
        nodes: "//div[@class='grid-item aspect-ratio-16x9']",
        name: { node: ".//div[@class='grid-item-description']//a" },
        href: { node: ".//a[1]", attribute: "href" },
        img: { node: ".//img", attribute: "src" },
        duration: { node: ".//span[contains(@class,'grid-item-dur')]" },
        preview: { node: ".//video//source", attribute: "src" }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["1080", "720", "480", "400", "360"],
            pattern: "src=\"([^\"]+)\" type=\"video/mp4\" label=\"{value}\""
        }
    }
}; 