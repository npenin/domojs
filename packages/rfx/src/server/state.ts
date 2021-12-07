import { Rfxtrx, RFXDevice } from "@domojs/rfx-parsers";

export interface State
{
    devices: { [key: string]: Partial<RFXDevice> & { gateway: Rfxtrx, type: number } };
    gateway: Promise<Rfxtrx>;
    setGateway(gw: Rfxtrx): Promise<Rfxtrx>;
}