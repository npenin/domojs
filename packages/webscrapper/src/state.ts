import { HttpOptions } from "@akala/core";

export default interface State
{
	sites: Record<string, Site<any>>;
}


export interface Site<T>
{
	authentication?: BasicAuthentication | OAuth;
	request?: RequestAuthentication
	login?: Page<unknown>;
	page: Page<T>;
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

export interface Page<T>
{
	method?: string;
	url: string | URL | Scrap;
	items: Item<T>;
	totalCountSelector?: string;
	nextPage?: RequestAuthentication;
}

export interface Item<T>
{
	selector: string;
	details?: Page<T>;
	scrap?: Record<keyof T, Scrap>
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