///<reference types="@types/node" />

declare module "udev"
{
    export interface IDevice
    {
        ID_MODEL: string;
        SUBSYSTEM: string;
        ID_VENDOR: string;
        DEVNAME: string;
    }

    export interface IMonitor extends NodeJS.EventEmitter
    {
        on(eventName: 'add', handler:(device: IDevice)=> void): this;
        on(eventName: 'remove', handler:(device: IDevice)=> void): this;
        on(eventName: 'change', handler:(device: IDevice)=> void): this;
    }

    export function list(): IDevice[];
    export function monitor(): IMonitor;
}