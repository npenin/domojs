declare type Arguments<T> = T extends ((...x: infer X) => any) ? X : never;
declare type Argument0<T> = T extends ((x: infer X, ...z:any[]) => any) ? X : never;
declare type Argument1<T> = T extends ((a:any, x: infer X, ...z:any[]) => any) ? X : never;
declare type Argument2<T> = T extends ((a:any, b:any, x: infer X, ...z:any[]) => any) ? X : never;
declare type Argument3<T> = T extends ((a:any, b:any, c:any, x: infer X, ...z:any[]) => any) ? X : never;
declare type Argument4<T> = T extends ((a:any, b:any, c:any, d:any, x: infer X, ...z:any[]) => any) ? X : never;
export namespace description 
	{
	export interface devicetype 
		{
		dispatch (cmd:'$serve'): any
		dispatch (cmd:'$attach'): any
		dispatch (cmd:'$metadata'): any
		dispatch (cmd:'list', ...args:[]): ReturnType<typeof import('./commands/device-types/list').default>
		dispatch (cmd:'register', ...args:[Argument0<typeof import('./commands/device-types/register').default>]): ReturnType<typeof import('./commands/device-types/register').default>
	}
}
