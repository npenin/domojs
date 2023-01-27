export interface Service
{
    fqdn: string;
    host: string;
    port: number;
    type: string;
    protocol: string;
    subtypes: string[];
    rawTxt: any;
    txt: Record<string, string>;
    name: string;
    addresses: string[];
}