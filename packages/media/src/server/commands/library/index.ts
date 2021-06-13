import Configuration from "../../configuration";

export default async function (config: Configuration)
{
    var libs = config.get('media.libraries');
    if (typeof (libs) === 'undefined')
    {
        config.set('media.libraries', libs = {});
        await config.commit();
    }
    return libs;
}