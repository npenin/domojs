import { Event, EventEmitter } from "@akala/core";
import { Rfxtrx, RFXDevice } from "@domojs/rfx-parsers";

export interface State
{
    endpoints: { [key: string]: Partial<RFXDevice> & { gateway: string, type: number } };
    gateways: Record<string, Rfxtrx>;
    // setGateway(gw: Rfxtrx): Promise<Rfxtrx>;
}