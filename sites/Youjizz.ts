import { NextHubConfig } from '../models/NextHubConfig';

export const YoujizzConfig: NextHubConfig = {
    enable: true,
    displayname: "Youjizz",
    host: "https://www.youjizz.com",
    menu: {
        route: {
            sort: "{host}/{sort}/{page}.html"
        },
        sort: {
            "Новинки": "newest-clips",
            "Популярные": "most-popular",
            "Топ рейтинга": "top-rated-week",
            "В тренде": "trending"
        }
    },
    list: { uri: "newest-clips/{page}.html" },
    search: { uri: "search/{search}-{page}.html" },
    contentParse: {
        nodes: "//div[@class='video-thumb']",
        name: { node: ".//div[@class='video-title']//a" },
        href: { node: ".//a[contains(@class, 'frame video')]", attribute: "href" },
        img: { node: ".//img", attribute: "data-original" },
        duration: { node: ".//span[@class='time']" },
        preview: { node: ".//a", attribute: "data-clip" }
    },
    view: {
        related: true,
        regexMatch: {
            format: "https:{value}",
            pattern: "\"quality\":\"Auto\",\"filename\":\"([^\"]+)\""
        }
    }
}; 