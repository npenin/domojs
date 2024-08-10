import { Http, Interpolate } from "@akala/core";
import { ElementType, parseDocument } from "htmlparser2";
import { Page, RequestAuthentication, Scrap, Site } from "../state.js";
import { selectAll } from 'css-select'
import type { AnyNode, Element, Text } from 'domhandler'
export class ScrapError extends Error
{
    constructor(public readonly page: Page<unknown, unknown>, public readonly options: RequestAuthentication, public readonly inner: Error)
    {
        super();

    }
}

export default async function scrap<TDirectScrap, T extends TDirectScrap>(site: Site<TDirectScrap, T>, http: Http)
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

export async function scrapPage<T, TDirectScrap extends T>(page: Page<T, TDirectScrap>, http: Http, options?: RequestAuthentication)
{
    var url = new URL(page.url as string | URL);
    if (options?.query)
        Object.entries(options.query).forEach(e => url.searchParams.append(e[0], e[1]));
    try
    {
        var response = await http.call({ url: url, method: page.method, headers: options?.headers })
    }
    catch (e)
    {
        console.error(e);
        throw e;
    }

    const dom = parseDocument(await response.text(), { recognizeSelfClosing: true })

    // console.time('process page ' + page.url)
    return await Promise.all(Array.from(selectAll(page.items.selector, dom).map(async function (item)
    {
        var result: Partial<T & TDirectScrap> = {};
        // var item = cheerio(this);
        if (page.items.scrap)
            Object.assign(result, scrapscraps(item, page.items.scrap));

        if (page.items.details)
        {
            var details = page.items.details;
            if (isScrap(page.items.details.url))
                details = Object.assign({}, page.items.details, { url: scrapscrap(selectAll(page.items.details.url.selector, item), page.items.details.url) });

            details.url = new URL(details.url as string | URL, page.url as string | URL);
            Object.assign(result, (await scrapPage(details, http, options))[0]);
        }
        return result;
    }))).then((result) =>
    {
        // console.timeEnd('process page ' + page.url);
        return result;
    }, err => { throw new ScrapError(page, options, err) });
}

function isScrap(obj: string | URL | Scrap): obj is Scrap
{
    return typeof (obj['selector']) !== 'undefined';
}

function scrapscraps(item: AnyNode, objectDefinition: Record<string, Scrap>)
{
    return Object.fromEntries(Object.entries(objectDefinition).map(e =>
    {
        let property: AnyNode[];
        if (e[1].selector)
            property = selectAll(e[1].selector, item);
        else
            property = [item]
        return [e[0], scrapscrap(property, e[1])];
    }))
}

function scrapscrap(element: AnyNode[], scrap: Scrap)
{
    if (!element.length && !scrap.scrap)
        return undefined;
    if (scrap.attribute)
    {
        if (scrap.multiple)
            return Array.from(element.map(function (el) { return (el as Element).attribs[scrap.attribute] }));
        return (element[0] as Element)?.attribs[scrap.attribute];
    }
    if (scrap.dataset)
        return (element[0] as Element)?.attribs['data-' + scrap.dataset];
    if (typeof scrap.textNode !== 'undefined')
    {
        return ((element[0] as Element).children.filter(function (el)
        {
            return el.type == ElementType.Text
        })[scrap.textNode] as Text)?.data
    }
    if (scrap.scrap)
    {
        if (scrap.multiple)
            return Array.from(element.map(function (el) { return scrapscraps(el, scrap.scrap) }));
        if (element.length)
            return scrapscraps(element[0], scrap.scrap);
        return null;
    }
    return text(element).join(' ');
}

function text(nodes: AnyNode[])
{
    let result = [];
    for (let i = 0; i < nodes.length; i++)
    {
        switch (nodes[i].type)
        {
            case ElementType.Comment:
                break;
            case ElementType.Text:
                result.push((nodes[i] as Text).data);
                break;
            case ElementType.Script:
            case ElementType.Style:
            case ElementType.CDATA:
            case ElementType.Tag:
                result = result.concat(text((nodes[i] as Element).children));
                break;
            default:
                console.log(nodes[i].type);
        }
    }
    return result;
}