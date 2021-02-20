import { EventEmitter } from 'events';
import { SerializableObject } from '@akala/json-rpc-ws'

export interface register
{
    (): { [category: string]: { [deviceName: string]: Device } };
    (device: Device, body?: any): PromiseLike<IDevice>;
}

export type CommandFunction = (value?: string | number) => PromiseLike<void>;

export interface RunnableCommand
{
    run: CommandFunction;
}

export type Command = CommandFunction | string | CommandDescription;

export interface IGateway
{
    name?: string;
    type?: string;
    category?: string;
    remove?(): void;
}

export interface IDevice
{
    name: string;
    type: string;
    room: string;
    category?: string;
    classes?: string[];
    statusMethod?: string | number;
    status?(): PromiseLike<string | { state: boolean, color: string } | SerializableObject>;
    statusUnit?: string;
    commands: { [key: string]: Command } | string[];
    subdevices?: IDevice[];
    remove?(): void;
}

export type CommandDescription = GenericCommand | RangeCommand | InputCommand | ToggleCommand;
export type RunnableCommandDescription = CommandDescription & RunnableCommand;

export interface GenericCommand
{
    type: 'button';
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

export interface Device extends EventEmitter, IDevice
{
}

export interface DeviceCollection
{
    [name: string]: Device;
}

export interface IDeviceCollection
{
    [name: string]: IDevice;
}

export interface DeviceType
{
    name: string;
    commandMode: 'dynamic' | 'static';
    view: string
}

export interface DeviceTypeCollection
{
    [name: string]: DeviceType;
}
