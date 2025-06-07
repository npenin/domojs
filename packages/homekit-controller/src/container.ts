//eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore 6133
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Arguments, Argument0, Argument1, Argument2, Argument3, Argument4, Argument5, Argument6, Argument7, Argument8, Argument9, Argument10, Argument11, Argument12, Argument13, Argument14, Argument15, Argument16, Argument17 } from '@akala/core';
import {Metadata, ICommandProcessor, Container, registerCommands} from "@akala/commands";
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace commands
{
	export interface container 
	{
		dispatch (cmd:'$init', ...args: [Argument0<typeof import('./commands/$init.js').default>]): ReturnType<typeof import('./commands/$init.js').default>
		dispatch (cmd:'device-discovered', ...args: []): ReturnType<typeof import('./commands/device-discovered.js').default>
		dispatch (cmd:'device-types.exec', ...args: [Argument0<typeof import('./commands/device-types/exec.js').default>, Argument1<typeof import('./commands/device-types/exec.js').default>, Argument2<typeof import('./commands/device-types/exec.js').default>]): ReturnType<typeof import('./commands/device-types/exec.js').default>
		dispatch (cmd:'device-types.save', ...args: [Argument0<typeof import('./commands/device-types/save.js').default>, Argument1<typeof import('./commands/device-types/save.js').default>]): ReturnType<typeof import('./commands/device-types/save.js').default>
		dispatch (cmd:'setup-pair', ...args: [Argument0<typeof import('./commands/setup-pair.js').default>, Argument2<typeof import('./commands/setup-pair.js').default>]): ReturnType<typeof import('./commands/setup-pair.js').default>
		dispatch (cmd:'verify-pair', ...args: [Argument0<typeof import('./commands/verify-pair.js').default>]): ReturnType<typeof import('./commands/verify-pair.js').default>
	}
	export interface proxy 
	{
		'$init'(...args: [Argument0<typeof import('./commands/$init.js').default>]): ReturnType<typeof import('./commands/$init.js').default>
		'device-discovered'(...args: []): ReturnType<typeof import('./commands/device-discovered.js').default>
		'device-types.exec'(...args: [Argument0<typeof import('./commands/device-types/exec.js').default>, Argument1<typeof import('./commands/device-types/exec.js').default>, Argument2<typeof import('./commands/device-types/exec.js').default>]): ReturnType<typeof import('./commands/device-types/exec.js').default>
		'device-types.save'(...args: [Argument0<typeof import('./commands/device-types/save.js').default>, Argument1<typeof import('./commands/device-types/save.js').default>]): ReturnType<typeof import('./commands/device-types/save.js').default>
		'setup-pair'(...args: [Argument0<typeof import('./commands/setup-pair.js').default>, Argument2<typeof import('./commands/setup-pair.js').default>]): ReturnType<typeof import('./commands/setup-pair.js').default>
		'verify-pair'(...args: [Argument0<typeof import('./commands/verify-pair.js').default>]): ReturnType<typeof import('./commands/verify-pair.js').default>
	}
   export const meta={"name":"@domojs/homekit-controller","commands":[{"name":"$init","config":{"fs":{"inject":["params.0","$container"],"path":"dist/commands/$init.js","source":"src/commands/$init.ts"},"":{"inject":["params.0","$container"]},"cli":{"inject":["context","$container"]}}},{"name":"device-discovered","config":{"fs":{"inject":[],"path":"dist/commands/device-discovered.js","source":"src/commands/device-discovered.ts"},"":{"inject":[]}}},{"name":"device-types.exec","config":{"fs":{"inject":["params.0","params.1","params.2"],"path":"dist/commands/device-types/exec.js","source":"src/commands/device-types/exec.ts"},"":{"inject":["params.0","params.1","params.2"]},"jsonrpc":{"inject":["params.0","params.1","params.2"]},"types":{"inject":["device: string","command: string","value: unknown"]},"cli":{"usage":"exec <device> <command> [value]","inject":["options.device","options.command","params.0"]}}},{"name":"device-types.save","config":{"fs":{"inject":["params.0","params.1"],"path":"dist/commands/device-types/save.js","source":"src/commands/device-types/save.ts"},"":{"inject":["params.0","params.1"]},"types":{"inject":["body","device"],"types":["unknown","import('@domojs/devices').devices.Device"]}}},{"name":"setup-pair","config":{"fs":{"inject":["params.0","http","params.1"],"path":"dist/commands/setup-pair.js","source":"src/commands/setup-pair.ts"},"":{"inject":["params.0","http","params.1"]},"http":{"method":"post","route":"/pair","inject":["body.accessory","http","body.pinCode"]},"types":{"inject":["accessory","http","pinCode"],"types":["string","import('@akala/core').Http","string"]}}},{"name":"verify-pair","config":{"fs":{"path":"dist/commands/verify-pair.js","source":"src/commands/verify-pair.ts","inject":["params.0"]},"":{"inject":["params.0"]}}}],"$schema":"https://raw.githubusercontent.com/npenin/akala/main/packages/commands/container-schema.json"} as Metadata.Container;

   export function connect(processor?:ICommandProcessor) {
            const container = new Container<void>("commands", void 0);
            registerCommands(meta.commands, processor, container);
            return container as container & Container<void>;
        }
}

export { commands as default };