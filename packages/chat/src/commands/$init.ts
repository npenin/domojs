import { dockStart, Dock } from '@nlpjs/basic';
import path from 'path'

export default async function (this: { dock: Dock })
{
    this.dock = await dockStart({
        "settings": {
            "pathPipeline": path.resolve(__dirname, '../../pipelines.md'),
            "nlp": {
                "autoSave": false,
                "modelFileName": path.resolve(__dirname, '../../model.nlp'),
                "corpora": [
                    require.resolve("../../corpora/greetings.corpus-fr.json")
                ],
                "forceNER": true
            },
            "ner": { "useDuckling": true },
            "console": {
                "debug": true
            }
        },
        "use": [
            "Basic",
            "LangFr",
            "ConsoleConnector"
        ]
    });
    var nlp = this.dock.get('nlp');
    this.dock.get('ner').addRule('*', 'email', 'regex', /\b(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})\b/gi);
    await nlp.train();
    var brainconsole = this.dock.get('console');
    brainconsole.onHear = async function a(self, line)
    {
        const nlp = self.container.get('nlp');
        if (nlp)
        {
            const result = await nlp.process(
                {
                    message: line,
                    channel: 'console',
                    app: self.container.name,
                },
                undefined,
                self.context
            );
            self.say(result);
        }
    };
    nlp.addAction('greetings.saionara', 'exit', null, async function ()
    {
        var console = this.dock.get('console');
        await console.say({ answer: 'pwic' });
        console.exit();
    })
}