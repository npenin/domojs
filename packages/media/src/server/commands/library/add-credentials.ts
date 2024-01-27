import { InteractError } from "@akala/pm";
import { LibraryState } from "../../state.js";

export default async function addFolder(this: LibraryState, url: string, username: string, password: string)
{
    if (!password)
        throw new InteractError('password', 'param.2');
    if (!this.has('vault'))
    {
        this.set('vault', {});
    }
    this.vault.set(url, { username });
    this.vault[url].setSecret('password', password);
    await this.commit();
}