import { Dock } from "@nlpjs/basic";
import { Corpus } from "@nlpjs/core";
import fs from 'fs/promises'

export default async function (this: { dock: Dock }, corpus: Corpus)
{
    var nlp = this.dock.get('nlp');
    if (corpus.contextData)
    {
        let { contextData } = corpus;
        if (typeof corpus.contextData === 'string')
        {
            contextData = JSON.parse(await fs.readFile(corpus.contextData, 'utf8'));
        }
        const contextManager = nlp.container.get('context-manager');
        const keys = Object.keys(contextData);
        for (let i = 0; i < keys.length; i += 1)
        {
            contextManager.defaultData[keys[i]] = contextData[keys[i]];
        }
    }
    if (corpus.domains)
    {
        if (corpus.entities)
        {
            nlp.addEntities(corpus.entities);
        }
        for (let i = 0; i < corpus.domains.length; i += 1)
        {
            const domain = corpus.domains[i];
            const { data, entities } = domain;
            const locale = domain.locale.slice(0, 2);
            nlp.addLanguage(locale);
            if (entities)
            {
                nlp.addEntities(entities, locale);
            }
            nlp.addData(data, locale, domain);
        }
    }
    else
    {
        const locale = corpus.locale.slice(0, 2);
        nlp.addLanguage(locale);
        const { data, entities } = corpus;
        if (entities)
        {
            nlp.addEntities(entities, locale);
        }
        nlp.addData(data, locale);

    }
}