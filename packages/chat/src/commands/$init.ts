import basic = require('@nlpjs/basic');
import path from 'path'

export default async function ()
{
    this.dock = await basic.dockStart({
        "settings": {
            "pathPipeline": path.resolve(__dirname, '../../pipelines.md'),
            "nlp": {
                "autoSave": false,
                "modelFileName": path.resolve(__dirname, '../../model.nlp'),
                "corpora": [
                    require.resolve("../../corpora/greetings.corpus-fr.json")
                ]
            },
            // "ner": {
            //     "useDuckling": false
            // },
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
    await nlp.train();
    var brainconsole = this.dock.get('console');
    // brainconsole.onHear;
    async function (line)
    {
        const name = `${this.settings.tag}.hear`;
        const pipeline = this.container.getPipeline(name);
        if (pipeline)
        {
            this.container.runPipeline(
                pipeline,
                { message: line, channel: 'console', app: this.container.name },
                this
            );
        } else
        {
            const bot = this.container.get('bot');
            if (bot)
            {
                const session = this.createSession({
                    channelId: 'console',
                    text: line,
                    address: { conversation: { id: 'console000' } },
                });
                await bot.process(session);
            } else
            {
                const nlp = this.container.get('nlp');
                if (nlp)
                {
                    const result = await nlp.process(
                        undefined,
                        {
                            message: line,
                            channel: 'console',
                            app: this.container.name,
                        },
                        this.context
                    );
                    console.log(result);
                    this.say(result);
                } else
                {
                    console.error(`There is no pipeline for ${name}`);
                }
            }
        }
    }
    nlp.addAction('greetings.saionara', (test) =>
    {
        var console = this.dock.get('console');
        console.say(test);
    }, null, function ()
    {
        process.exit();
    })
}