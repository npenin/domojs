import { Event, EventEmitter } from "@akala/core";
import { Rfxtrx, RFXDevice } from "@domojs/rfx-parsers";

export interface State
{
    devices: { [key: string]: Partial<RFXDevice> & { gateway: Promise<Rfxtrx>, type: number } };
    gateways: EventEmitter<{ add: Event<[string, Rfxtrx], Promise<Rfxtrx>>, del: Event<[string, Rfxtrx], Promise<void>> }>;
    // setGateway(gw: Rfxtrx): Promise<Rfxtrx>;
}