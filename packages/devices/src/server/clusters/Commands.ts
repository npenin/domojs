import { Metadata } from "@akala/commands";
import { Cluster } from "../clients/index.js";

export type Commands = Cluster<{ Actions: Metadata.Container; }, {
    exec: {
        inputparams: [cmd: Metadata.Command, params: any[]];
        outputparams: [Error | undefined, unknown];
    };
}, {}>;
