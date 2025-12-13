import { State } from "../state.js";

export default async function (this: State)
{
    return new Promise<void>(resolve =>
    {
        this.browser.close().then(resolve).catch(err =>
        {
            console.error('Error closing WS-Discovery:', err);
            resolve();
        });
    });
}
