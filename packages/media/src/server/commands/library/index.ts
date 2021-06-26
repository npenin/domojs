import Configuration from "../../configuration";

export default async function (config: Configuration)
{
    var libs = config.libraries;
    if (typeof (libs) === 'undefined')
    {
        config.libraries=libs = {};
        await config.commit();
    }
    return libs;
}