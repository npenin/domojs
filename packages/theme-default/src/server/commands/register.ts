import { State, ModuleDefinition } from '../state';

export default function registerModule(this: State, module: ModuleDefinition)
{
    this.modules[name] = module;
}