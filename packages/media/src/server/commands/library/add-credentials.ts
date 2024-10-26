import { InteractError } from "@akala/cli";
import { LibraryState } from "../../state.js";

export default async function addFolder(this: LibraryState, host: string, username: string, password: string)
{
    if (!password)
        throw new InteractError('password', 'password');
    if (!this.has('vault'))
    {
        this.set('vault', {});
    }
    this.vault.set(host, { username });
    await this.vault[host].setSecret('password', password);
    await this.commit();
}