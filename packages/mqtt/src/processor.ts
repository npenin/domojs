import { CommandProcessor, Container, StructuredParameters } from '@akala/commands'
import { Command } from '@akala/commands/dist/metadata';
import { MiddlewarePromise } from '@akala/core';

export class MqttProcessor extends CommandProcessor
{
    handle(origin: Container<unknown>, cmd: Command, param: StructuredParameters<unknown[]>): MiddlewarePromise
    {
        return Promise.resolve();
    }

}