import State from "../state.js";

export default async function (this: State, audio_locale: string, subtitle_locales: string[])
{
    if (!this.has('locales'))
        this.set('locales', {});
    this.locales[audio_locale] = subtitle_locales || [];
    await this.commit();
}