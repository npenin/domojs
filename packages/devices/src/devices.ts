export type CommandFunction = (value?: string | number) => PromiseLike<void>;

export interface RunnableCommand
{
    run: CommandFunction;
}

export type Command = CommandFunction | string | CommandDescription;

export type CommandDescription = GenericCommand | RangeCommand | InputCommand | ToggleCommand | OnOffCommand;
export type RunnableCommandDescription = CommandDescription & RunnableCommand;

export interface GenericCommand
{
    type: 'button';
}

export interface OnOffCommand
{
    type: 'onoff';
    state: 'on' | 'off' | 'toggle';
}

export interface RangeCommand
{
    type: 'range';
    min: number;
    max: number;
    value?: number;
}

export interface InputCommand
{
    type: 'input';
    values: string[];
    value?: string;
}

export interface ToggleCommand
{
    type: 'toggle';
    value?: boolean;
}