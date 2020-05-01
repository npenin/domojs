import { Rfxtrx, RFXDevice } from "rfxtrx";

export interface State
{
    devices: { [key: string]: Partial<RFXDevice> & { gateway: Rfxtrx, type: number } };
    gateway: Promise<Rfxtrx>;
}