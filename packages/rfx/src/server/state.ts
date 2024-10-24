import { Event, EventEmitter } from "@akala/core";
import { Rfxtrx, RFXDevice } from "@domojs/rfx-parsers";

export interface State
{
    devices: { [key: string]: Partial<RFXDevice> & { gateway: Promise<Rfxtrx>, type: number } };
    gateways: Record<string, Rfxtrx>;
    // setGateway(gw: Rfxtrx): Promise<Rfxtrx>;
}