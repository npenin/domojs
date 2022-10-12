import { HttpOptions } from "@akala/core";

export default interface State
{
	sites: Record<string, Site>;
}

export interface Site
{
	authentication?: BasicAuthentication | OAuth;
	request?: RequestAuthentication
	login?: Page;
	page: Page;
}

export interface BasicAuthentication
{
	user: string;
	pass: string;
}

export interface OAuth
{
	clientId: string;
	clientSecret: string;

}

export type RequestAuthentication = { headers?: Record<string, string>, query?: Record<string, string> }

export interface Page
{
	method?: string;
	url: string | URL | Scrap;
	items: Item;
	totalCountSelector?: string;
	nextPage?: RequestAuthentication;
}

export interface Item
{
	selector: string;
	details?: Page;
	scrap?: Record<string, Scrap>
}

export interface Scrap
{
	selector: string;
	multiple?: boolean;
	scrap?: Record<string, Scrap>;
	attribute?: string;
	dataset?: string;
	textNode?: number;
}