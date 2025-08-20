import { Page, page, RootElement, serviceModule } from '@akala/client'
import template from './device.html?raw'
import { EndpointProxy } from '@domojs/devices';
import { AsyncEventBus, AsyncFormatter, FormatExpression } from '@akala/core';
import { MqttEvents } from '@domojs/mqtt';
import { ConstantExpression } from '@akala/core/expressions';

@page({ template, 'inject': [RootElement, 'params', [serviceModule, 'mqtt']] })
export default class Device extends Page
{
    constructor(el: HTMLElement, params, mqtt: AsyncEventBus<MqttEvents>)
    {
        super(el, new FormatExpression(new ConstantExpression(EndpointProxy.fromBus(mqtt, 'domojs/devices', 0)), AsyncFormatter, null));

        console.log(params);
    }
}