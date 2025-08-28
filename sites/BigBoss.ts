import { NextHubConfig } from '../models/NextHubConfig';

export const BigBossConfig: NextHubConfig = {
    enable: true,
    displayname: "BigBoss",
    host: "https://bigboss.video",
    menu: {
        route: {
            cat: "{host}/category/{cat}_page-{page}.html",
            sort: "{host}/videos/{sort}_page-{page}.htm"
        },
        sort: {
            "Новинки": "",
            "Популярное": "popular"
        },
        categories: {
            "Азиатки": "aziatki",
            "Анальный секс": "anal",
            "Анилингус": "anilingys",
            "Аниме и Хентай": "hentai",
            "БДСМ": "bd-sm",
            "Беременные": "beremennie",
            "Бисексуалы": "bisexual",
            "Большие жопы": "big-butt",
            "Большие сиськи": "boooobs",
            "Большие члены": "big-penis",
            "Брат и сестра": "brat-i-sestra",
            "Вирт.Реальность (VR)": "vrporn",
            "Волосатая пизда": "hairy",
            "Всяко-разное": "other",
            "Гей порно": "hotgays",
            "Групповуха": "orgia",
            "Для женщин": "nice-sex",
            "Домашнее (любительское)": "domashka",
            "Дрочка девушкам": "drochka-telkam",
            "Дрочка парням": "drochka",
            "Жесткое (хардкор)": "hard-sex",
            "Записи приватов (Вебкам)": "webcam",
            "Знаменитости": "stars",
            "Зрелые": "zrelue",
            "Измены (муж куколд)": "cucold",
            "Инцест": "hot-incest",
            "Кастинг": "kasting",
            "Куннилингус": "kunilingus",
            "Лесбиянки": "lesbiyanka",
            "Мамки (МИЛФ)": "milf",
            "Межрасовый секс": "blackman",
            "Минет": "minet-video",
            "Молодые": "molodue",
            "Мультики": "sex-mult",
            "На лицо (камшоты)": "kamshotu",
            "От первого лица": "pov-sex",
            "Пародии и косплей": "parodii-i-kosplei",
            "Приколы (смешное)": "humor",
            "Ретро, старое": "retro-video",
            "Русское порно": "rus",
            "С неграми": "bbc",
            "Свингеры": "svingeru",
            "Секретарши": "sekretarshi",
            "Секс Вайф": "seks-vaif",
            "Скрытая камера": "spygazm",
            "Служанки, горничные": "slyzhanki",
            "Соло девушек": "solo-telki",
            "Соло парней": "solomen",
            "Студенты": "stydenti",
            "Толстые (толстушки)": "bbw",
            "Трансвеститы (трансы)": "lady-boy",
            "Фетиш": "fetish",
            "Фистинг": "fisting",
            "Эротика": "classic-sex"
        }
    },
    list: { uri: "latest/{page}/" },
    search: { uri: "search/{search}/page/{page}/" },
    contentParse: {
        nodes: "//div[contains(@class,'main__ct-items')]//div[contains(@class,'main__ct-item')]",
        name: { node: ".//div[contains(@class,'video-unit__caption')]" },
        href: { node: ".//a[contains(@class,'video-unit')]", attribute: "href" },
        img: { node: ".//img", attributes: ["data-src", "src"] }
    },
    view: {
        related: true,
        regexMatch: {
            matches: ["1080", "720", "480", "360"],
            pattern: "/(common/getvideo/video.mp4\\?q={value}&[^\", ]+)",
            format: "{host}/{value}"
        }
    }
}; 