import State from "../state.js";

export default async function (this: State, audio_locale: string, subtitle_locales: string[])
{
    this.locales.delete(audio_locale);
    await this.commit();
}