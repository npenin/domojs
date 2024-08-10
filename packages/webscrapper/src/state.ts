export default interface State
{
	sites: Record<string, Site<any, any>>;
}

export interface Site<TDirectScrap, T extends TDirectScrap>
{
	authentication?: BasicAuthentication | OAuth;
	request?: RequestAuthentication
	login?: Page<unknown, unknown>;
	page: Page<TDirectScrap, T>;
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

export interface Page<TDirectScrap, T extends TDirectScrap>
{
	method?: string;
	url: string | URL | Scrap;
	items: Item<TDirectScrap, T>;
	totalCountSelector?: string;
	nextPage?: RequestAuthentication;
}

export interface Item<TDirectScrap, T extends TDirectScrap>
{
	selector: string;
	details?: Page<Partial<T>, Partial<T>>;
	scrap?: { [key in keyof TDirectScrap]?: Scrap }
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