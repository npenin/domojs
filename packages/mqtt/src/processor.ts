import { CommandProcessor, Container, StructuredParameters, Metadata } from '@akala/commands'
import { MiddlewarePromise } from '@akala/core';

export class MqttProcessor extends CommandProcessor
{
    handle(origin: Container<unknown>, cmd: Metadata.Command, param: StructuredParameters<unknown[]>): MiddlewarePromise
    {
        return Promise.resolve();
    }

}