declare type Arguments<T> = T extends ((...x: infer X) => any) ? X : never;
declare type Argument0<T> = T extends ((x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument1<T> = T extends ((a: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument2<T> = T extends ((a: any, b: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument3<T> = T extends ((a: any, b: any, c: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument4<T> = T extends ((a: any, b: any, c: any, d: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument5<T> = T extends ((a: any, b: any, c: any, d: any, e: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument6<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument7<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument8<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument9<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument10<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument11<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument12<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument13<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument14<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, n: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument15<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, n: any, o: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument16<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, n: any, o: any, p: any, x: infer X, ...z: any[]) => any) ? X : never;
declare type Argument17<T> = T extends ((a: any, b: any, c: any, d: any, e: any, f: any, g: any, h: any, i: any, j: any, k: any, l: any, m: any, n: any, o: any, p: any, q: any, x: infer X, ...z: any[]) => any) ? X : never;
export default interface taskManager 
{
	dispatch(cmd: '$init', ...args: [Argument0<typeof import('./commands/task-manager/$init.js').default>]): ReturnType<typeof import('./commands/task-manager/$init.js').default>
	dispatch(cmd: 'get', ...args: []): ReturnType<typeof import('./commands/task-manager/get.js').default>
	dispatch(cmd: 'new-channel', ...args: [Argument0<typeof import('./commands/task-manager/new-channel.js').default>, Argument1<typeof import('./commands/task-manager/new-channel.js').default>]): ReturnType<typeof import('./commands/task-manager/new-channel.js').default>
	dispatch(cmd: 'new', ...args: [Argument1<typeof import('./commands/task-manager/new.js').default>]): ReturnType<typeof import('./commands/task-manager/new.js').default>
	dispatch(cmd: 'pause-trigger', ...args: [Argument0<typeof import('./commands/task-manager/pause-trigger.js').default>]): ReturnType<typeof import('./commands/task-manager/pause-trigger.js').default>
	dispatch(cmd: 'prevent-next-trigger', ...args: [Argument0<typeof import('./commands/task-manager/prevent-next-trigger.js').default>]): ReturnType<typeof import('./commands/task-manager/prevent-next-trigger.js').default>
	dispatch(cmd: 'resume-trigger', ...args: [Argument0<typeof import('./commands/task-manager/resume-trigger.js').default>]): ReturnType<typeof import('./commands/task-manager/resume-trigger.js').default>
}
