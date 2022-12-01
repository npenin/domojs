export default async function ()
{
    return new Promise(resolve =>
    {
        this.browser.destroy(resolve);
    });
}