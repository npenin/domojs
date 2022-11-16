import { Http, HttpOptions, Interpolate } from "@akala/core";
import { AnyNode, Cheerio, CheerioAPI, load as cheerio, Node } from "cheerio";
import { ElementType } from "htmlparser2";
import { Page, RequestAuthentication, Scrap, Site } from "../state";

export default async function scrap(site: Site, http: Http)
{
    if (site.authentication)
        throw new Error('Not supported yet');

    var pageIndex = 1;
    var results = await scrapPage(site.page, http, site.request);
    var nextPage = new Interpolate('{{', '}}').buildObject(site.page.nextPage);
    if (site.page.nextPage)
    {
        while (true)
        {
            console.log('processing page ' + (++pageIndex));

            let intermediateResults = await scrapPage(site.page, http, Object.assign({}, site.request, nextPage({ $page: pageIndex, $skip: results.length })));
            if (intermediateResults.length == 0)
                break;
            results.push(...intermediateResults);
        }
    }
    return results;
}

export async function scrapPage(page: Page, http: Http, options?: RequestAuthentication)
{
    var url = new URL(page.url as string | URL);
    if (options?.query)
        Object.entries(options.query).forEach(e => url.searchParams.append(e[0], e[1]));
    var response = await http.call({ url: url, method: page.method, headers: options?.headers })

    let $ = cheerio(await response.text())
    // console.time('process page ' + page.url)
    return await Promise.all(Array.from($(page.items.selector).map(async function ()
    {
        var result = {};
        var item = cheerio(this);
        if (page.items.scrap)
            Object.assign(result, scrapscraps(item, page.items.scrap));

        if (page.items.details)
        {
            var details = page.items.details;
            if (isScrap(page.items.details.url))
                details = Object.assign({}, page.items.details, { url: scrapscrap(item(page.items.details.url.selector), page.items.details.url) });

            details.url = new URL(details.url as string | URL, page.url as string | URL);
            Object.assign(result, (await scrapPage(details, http, options))[0]);
        }
        return result;
    }))).then((result) =>
    {
        // console.timeEnd('process page ' + page.url);
        return result;
    });
}

function isScrap(obj: string | URL | Scrap): obj is Scrap
{
    return typeof (obj['selector']) !== 'undefined';
}

function scrapscraps(item: CheerioAPI, objectDefinition: Record<string, Scrap>)
{
    return Object.fromEntries(Object.entries(objectDefinition).map(e =>
    {
        var property = item(e[1].selector);
        return [e[0], scrapscrap(property, e[1])];
    }))
}

function scrapscrap(property: Cheerio<AnyNode>, scrap: Scrap)
{
    if (scrap.attribute)
        return property.attr()[scrap.attribute];
    if (scrap.dataset)
        return property.data(scrap.dataset);
    if (typeof scrap.textNode !== 'undefined')
    {
        return (property.contents().filter(function ()
        {
            return this.type == ElementType.Text
        })[scrap.textNode] as any).data
    }
    if (scrap.scrap)
    {
        if (scrap.multiple)
            return Array.from(property.map(function () { return scrapscraps(cheerio(this), scrap.scrap) }));
        return scrapscraps(cheerio(property[0]), scrap.scrap);
    }
    return property.text();
}
