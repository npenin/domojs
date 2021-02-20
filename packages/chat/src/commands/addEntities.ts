import { Dock } from "@nlpjs/basic";
import { Entity } from "@nlpjs/core";

export default async function (this: { dock: Dock }, entities: { [key: string]: Entity }, locale?: string)
{
    this.dock.get('nlp').addEntities(entities, locale);
}