import State from "../state.js";

export default async function (this: State, locale: string)
{
    this.locale = locale;
    await this.commit();
}