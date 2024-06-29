import { eachAsync } from "@akala/core";
import { LibraryState } from "../../state.js";
import updateIndex, { getIndexFileName } from "./update-index.js";
import { fsHandler } from "../processFolder.js";
import { Media } from "../../../../metadata.js";
import Configuration from "../../configuration.js";
import { Container } from "@akala/commands";
import { extname } from 'path'

export default async function dedupe(this: LibraryState, container: Container<Configuration>, library: string, type?: 'music' | 'video', simulate?: boolean) {


    if (!type) {
        return eachAsync(['music', 'video'] as const, type => dedupe.call(this, container, library, type));
    }

    const indexFileName = getIndexFileName(this, library, type);
    const { provider: fs } = await fsHandler.process(indexFileName, { config: this });
    let results: Media[];
    try {
        results = JSON.parse(await fs.readFile(indexFileName, 'utf-8'));
    }
    catch (e) {
        if (e && e.code == 'ENOENT') {
            await updateIndex.call(this, container, library, type);
            results = JSON.parse(await fs.readFile(indexFileName, 'utf-8'));
        }
    }

    const identicals: Record<string, Media[]> = {}
    for (let i = 0; i < results.length; i++) {
        if (i == 0)
            identicals[results[i].path.toString()] = [results[i]];
        const extension = extname(results[i].path.toString());
        if (/ \(\d\)$/.test(results[i].name)) {
            const dedupePath = results[i].path.toString().substring(0, results[i].path.toString().length - extension.length - 6) + extension;
            if (!(dedupePath in identicals))
                identicals[dedupePath] = [results[i]];
            else
                identicals[dedupePath].push(results[i]);
        }
        else if (!(results[i].path.toString() in identicals))
            identicals[results[i].path.toString()] = [results[i]];
        else
            identicals[results[i].path.toString()].push(results[i]);
    }

    for (const identical of Object.entries(identicals).filter(x => x[1].length > 1)) {
        await eachAsync(identical[1], async media => {
            const { provider: fs } = await fsHandler.process(new URL('domojs://' + library + '/' + media.relativePath[0] + '/'), { config: this });

            if (media.path.toString() != identical[0]) {
                console.log('removing', media.path);
                if (!simulate)
                    await fs.deleteFile(media.path.toString());
            }
        });
    };

    return;


}