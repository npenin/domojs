import { ProxyConfiguration } from "@akala/config";

export default interface State extends ProxyConfiguration<
    {
        userName: string,
        password: string,
        locale?: string,
        locales: Record<string, string[]>
    }>
{
}

export const urls = {
    "token": "https://beta-api.crunchyroll.com/auth/v1/token",

    "index": "https://beta-api.crunchyroll.com/index/v2",
    "profile": "https://beta-api.crunchyroll.com/accounts/v1/me/profile?{}",

    "series": "https://beta-api.crunchyroll.com/cms/v2{}/series/{}?{}",
    "seasons": "https://beta-api.crunchyroll.com/cms/v2{}/seasons?series_id={}&{}",
    "episodes": "https://beta-api.crunchyroll.com/cms/v2{}/episodes?season_id={}&{}",
    "streams": "https://beta-api.crunchyroll.com/cms/v2{}/videos/{}/streams?{}",

    "categories": "https://beta-api.crunchyroll.com/content/v1/tenant_categories?guid={}&{}",
    "rate": "https://beta-api.crunchyroll.com/content-reviews/v2/user/{}/rating/series/{}",
    "similar": "https://beta-api.crunchyroll.com/content/v1/similar_to?guid={}&n={}&{}",

    "search": "https://beta-api.crunchyroll.com/content/v1/search?q={}&{}",
    "getAllAnimes": "https://beta-api.crunchyroll.com/content/v1/browse?sort_by={}&start={}&n={}&{}",

    "newsFeed": "https://beta-api.crunchyroll.com/content/v1/news_feed?{}"
};