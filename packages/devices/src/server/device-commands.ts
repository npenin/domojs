declare type Arguments<T> = T extends ((...x: infer X) => any) ? X : never;
declare type Argument0<T> = T extends ((x: infer X, ...z:any[]) => any) ? X : never;
declare type Argument1<T> = T extends ((a:any, x: infer X, ...z:any[]) => any) ? X : never;
declare type Argument2<T> = T extends ((a:any, b:any, x: infer X, ...z:any[]) => any) ? X : never;
declare type Argument3<T> = T extends ((a:any, b:any, c:any, x: infer X, ...z:any[]) => any) ? X : never;
declare type Argument4<T> = T extends ((a:any, b:any, c:any, d:any, x: infer X, ...z:any[]) => any) ? X : never;
export namespace description 
	{
	export interface devices 
		{
		dispatch (cmd:'$serve'): any
		dispatch (cmd:'$attach'): any
		dispatch (cmd:'$metadata'): any
		dispatch (cmd:'$init', ...args:[]): ReturnType<typeof import('./commands/devices/$init').default>
		dispatch (cmd:'add', ...args:[Argument3<typeof import('./commands/devices/add').default>, Argument4<typeof import('./commands/devices/add').default>]): ReturnType<typeof import('./commands/devices/add').default>
		dispatch (cmd:'get-by-category', ...args:[Argument1<typeof import('./commands/devices/get-by-category').default>]): ReturnType<typeof import('./commands/devices/get-by-category').default>
		dispatch (cmd:'get-by-name', ...args:[Argument1<typeof import('./commands/devices/get-by-name').default>]): ReturnType<typeof import('./commands/devices/get-by-name').default>
		dispatch (cmd:'register', ...args:[Argument0<typeof import('./commands/devices/register').default>, Argument1<typeof import('./commands/devices/register').default>, Argument2<typeof import('./commands/devices/register').default>]): ReturnType<typeof import('./commands/devices/register').default>
	}
}
