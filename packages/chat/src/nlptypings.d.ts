declare module '@nlpjs/basic'
{
    import { Container, Pipeline } from '@nlpjs/core'
    import { NlpSettings, Nlp } from '@nlpjs/nlp'
    import { NerSettings, Ner } from '@nlpjs/ner'
    import { ConsoleConnector, ConsoleSettings } from '@nlpjs/console-connector'

    export function containerBootstrap(
        inputSettings: { env?: any, pipelines?: string },
        mustLoadEnv?: boolean,
        container?: Container,
        preffix?: string,
        pipelines?: Pipeline[],
        parent?: any
    )

    export function dockStart(options: DockOptions): Dock;
    export interface DockOptions
    {
        settings: SettingsMap;
        use: string[];
    }
    export interface SettingsMap
    {
        pathPipeline: string;
        nlp: NlpSettings;
        ner: NerSettings;
        console: ConsoleSettings;
    }
    export interface Dock extends Container
    {
        get(name: 'console'): ConsoleConnector;
        get(name: 'ner'): Ner;
        get(name: 'nlp'): Nlp;
    }

}

declare module '@nlpjs/core'
{
    import { Rule } from '@nlpjs/ner'

    export interface Sentiment
    {

    }

    export interface Utterance
    {
        value: string;
        locale?: string;
        utterance?: string;
        message?: string;
        text?: string;
    }

    export interface SourceInput
    {
        locale?: string;
        nerRules?: Rule[];
    }

    export class Connector
    {
        container: Container;
        context: Context;
    }

    export interface Domain
    {
        name: string;
        data: any;
        locale: string;
        entities: { [key: string]: Entity };
    }

    export interface Context
    {
        channel: String;
        app: string;
        from: string;
        entities: { [key: string]: ProcessedEntity }
        slotFill: any;
    }

    export interface Corpus
    {
        locale: string
        entities?: { [key: string]: Entity };
        contextData: string | { [key: string]: object };
        data: { intent: string, utterances: string[], answers?: string[] }[];
        domains: Domain[];

    }

    export interface CorpusImporter
    {
        importer: string;
    }

    export interface Entity
    {
        entity: string;
        regex: RegExp | string[];
        locale?: string;
        options: { [key: string]: any };
        trim?: TrimOptions[];
    }

    export interface TrimOptions
    {
        position: number;
        words: string[];
        opts?: any;
    }

    export interface ProcessedEntity extends Entity
    {
        sourceText: string;
        alias: string;
    }

    export interface OrganizedEntity extends Entity
    {
        isList?: boolean;
        items?: Entity[];
    }

    export interface Configuration
    {
        use?: string[] | string;
        terraform?: { className: string, name: string }[];
        childs?: any;
    }

    export interface Container
    {
        name: string;
        getConfiguration(name: string): Configuration;
        registerConfiguration(name: string, config: Configuration): void;
        register(name: string, value: any);
        use<T>(clazz: new (container: Container) => T);
        use<T>(value: T);
        childs?: any;
        get(name: string): any;
    }

    export interface Logger
    {
        debug(...args: any[]): void;
        info(...args: any[]): void;
        warn(...args: any[]): void;
        error(...args: any[]): void;
        log(...args: any[]): void;
        trace(...args: any[]): void;
        fatal(...args: any[]): void;
    }

    export interface Pipeline
    {
        tag: string;
        pipeline: void;
        overwrite: void;
    }

    export class Clonable
    {
        constructor(settings: { container?: Container }, container: Container);

        get logger(): Logger;

        applySettings<TSrc, TSettings>(srcobj: TSrc, settings: TSettings): TSrc & TSettings;

        toJSON(): object;

        fromJSON(json: object): void;

        objToValues<T>(obj: T, srcKeys: (keyof (T))[]): any[];

        valuesToObj<TKey, TValue>(values: any[], keys: string[]): { [key: string]: any };

        getPipeline(tag: string): Pipeline;

        runPipeline(input: string, pipeline: Pipeline): Promise<void>;

        use(item: any): void;
    }
}

declare module '@nlpjs/nlp'
{
    import { Container, Clonable, Context, Sentiment, Entity, OrganizedEntity, Domain, Utterance, CorpusImporter } from '@nlpjs/core'
    import { NluSettings } from '@nlpjs/nlu'
    import { Action } from '@nlpjs/nlg'

    export interface NlpSettings
    {
        calculateSentiment?: boolean;
        autoSave?: boolean;
        modelFileName?: string;
        corpora?: string[];
        forceNER?: boolean;
    }

    // export interface Configuration
    // {
    //     nluByDomain?: { [key: string]: { className: string, settings: NlpSettings } };
    // }

    export interface Output
    {
        locale: string;
        utterance: string;
        context: Context;
        settings: NlpSettings & NluSettings;
        optionalUtterance?: string;
        score?: number;
        intent: string;
        entities: Entity[];
        sourceEntities?: Entity[];
        answers: string[];
        answer: string;
        sentiment?: Sentiment;
    }

    class Nlp extends Clonable
    {
        constructor(settings?: { container?: Container }, container?: Container);

        public readonly container: Container;
        public readonly forceNER?: boolean;
        public readonly slotManager;
        public onIntent: (nlp: Nlp, result: Output) => void | Promise<void>;

        registerDefault();

        initialize();

        start(): Promise<void>;

        loadOrTrain(): Promise<void>

        useNlu(clazz: string | any, locale: string | string[], domain?: string, settings?: NlpSettings);

        guessLanguage(input: string): string;

        addLanguage(locales: string | string[]): void;

        removeLanguage(locales: string | string[]): void;

        addDocument(locale: string, utterance: string, intent: string);

        removeDocument(locale: string, utterance: string, intent: string);

        getRulesByName(locale: string, name: string): any;

        addNerRule(locale: string, name: string, type: 'regex', rule: RegExp)
        addNerRule(locale: string, name: string, type: 'enum', rule: string[])
        addNerRule(locale: string, name: string, type: 'trim', rule: any)
        addNerRule(locale: string, name: string, type: 'builtin', rule: any)
        addNerRule(locale: string, name: string, type: string, rule: any)
        addNerRule(locale: string, name: string, type: string, rule: any);

        removeNerRule(locale: string, name: string, rule?: any);

        addNerRuleOptionTexts(locale: string, name: string, option: any, texts: string[]);

        removeNerRuleOptionTexts(locale: string, name: string, option: any, texts: string[]);

        addNerRegexRule(locale: string, name: string, regex: RegExp);

        addNerBetweenCondition(locale: string, name: string, left: number, right: number, opts: any);

        addNerPositionCondition(locale: string, name: string, position: number, words: string[], opts: any);

        addNerAfterCondition(locale: string, name: string, words: string[], opts: any);

        addNerAfterFirstCondition(locale: string, name: string, words: string[], opts: any);

        addNerAfterLastCondition(locale: string, name: string, words: string[], opts: any);

        addNerBeforeCondition(locale: string, name: string, words: string[], opts: any);

        addNerBeforeFirstCondition(locale: string, name: string, words: string[], opts: any);

        addNerBeforeLastCondition(locale: string, name: string, words: string[], opts: any);

        addNamedEntityText(entity: string, name: string, locale: string[], alises: string[]);

        assignDomain(locale: string, intent: string, domain: string);

        getIntentDomain(locale: string, intent: string);

        getDomains(): string[];

        addAction(intent: string, action: string, parameters?: any[], fn?: () => void | Promise<void>);

        getActions(intent: string): Action[];

        removeAction(intent: string, action: Action, parameters: any);

        removeActions(intent: string);

        addAnswer(locale: string, intent: string, answer: string, opts: any);

        removeAnswer(locale: string, intent: string, answer: string, opts: any);

        findAllAnswers(locale: string, intent: string);

        addCorpora(names: string | string[]): Promise<void>;

        addImported(input: { content?: any, filename?: string, importer?: string }): Promise<void>;

        addEntities(entities: { [key: string]: Entity }, locale?: string): void;

        addData(data: { intent: string, utterances: string[], answers?: string[] }[], locale: string, domain?: Domain)

        addCorpus(fileName: string | CorpusImporter): Promise<void>;

        getSentiment(utterance: Utterance): Sentiment
        getSentiment(locale: string, utterance: Utterance): Sentiment
        getSentiment(locale: string | Utterance, utterance: Utterance): Sentiment;

        describeLanguage(locale: string, name: string): any

        train(): Promise<void>

        classify(locale: string, utterance: Utterance, settings: NluSettings);

        extractEntities(locale: Utterance): Promise<any>;
        extractEntities(locale: string | null | undefined, utterance: Utterance, context, settings): Promise<any>;
        extractEntities(locale: string | Utterance, utterance: Utterance, context: Context, settings): Promise<any>;
        extractEntities(locale: string | Utterance, utterance?: Utterance, context?: Context, settings?): Promise<any>;

        organizeEntities(entities: Entity[]): { [key: string]: OrganizedEntity[] }

        process(locale: string | Utterance, utterance?: string | Utterance, srcContext?: any, settings?): Promise<Output>;

        fromJSON(json: any): void;

        export(minified?: boolean): string;

        import(data): void;

        save(srcFileName, minified?: boolean): Promise<void>

        load(srcFileName): Promise<boolean>;
    }

}

declare module '@nlpjs/console-connector'
{
    import { Connector } from '@nlpjs/core'
    import { Output } from '@nlpjs/nlp'

    export interface ConsoleSettings
    {
        debug?: boolean
    }

    export class ConsoleConnector extends Connector
    {
        onHear: (connector: ConsoleConnector, line: string) => Promise<void>;
        say(result: Output | string);
    }
}

declare module '@nlpjs/ner'
{
    import { Container, Clonable, SourceInput, Entity } from '@nlpjs/core'
    import { Output } from '@nlpjs/nlp'

    export interface NerSettings
    {
        tag?: 'ner';
        useDuckling?: boolean;
    }

    export interface Rule
    {
        name: string;
        type: string;
        leftWords?: string[]
        rightWords?: string[]
        regex?: RegExp;
        options?: { noSpaces?: boolean, caseSensitive?: boolean };
        words?: string[];
        rules: Rule[];
    }


    export enum TrimType
    {
        Between = 'between',
        After = 'after',
        AfterLast = 'afterLast',
        AfterFirst = 'afterFirst',
        Before = 'before',
        BeforeFirst = 'beforeFirst',
        BeforeLast = 'beforeLast',
    }

    export class Ner extends Clonable
    {
        constructor(settings?: NerSettings, container?: Container);

        registerDefault(): void;

        getRulesByName(locale?: string, name?: string, force?: boolean): Rule

        addRule(locale: string | string[] | null | undefined, name: string, type: 'regex', rule: RegExp): void;
        addRule(locale: string | string[] | null | undefined, name: string, type: 'trim', rule: {
            type: TrimType,
            words: string[],
            options: any
        }): void;
        addRule(locale: string | string[] | null | undefined, name: string, type: string, rule: any): void;

        asString(item: any): string;

        findRule(rules: Rule[], rule: Rule): number;

        removeRule(locale: string | string[] | null | undefined, name: string, rule: Rule);

        getRules(locale?: string): Rule[]

        decideRules(srcInput: SourceInput);

        getRuleOption(rules: Rule[], option: any): { texts: string[] } | undefined;

        addRuleOptionTexts(locale: string | string[], name: string, option: string[], srcTexts: string[]);

        removeRuleOptionTexts(locale: string | string[], name: string, option: string[], srcTexts: string[]);

        static str2regex(str: string): RegExp;

        static regex2str(regex: RegExp): string;

        addRegexRule(locale: string, name: string, srcRegex: string | RegExp): void;

        addBetweenCondition(locale: string, name: string, srcLeftWords: string | string[], srcRightWords?: string | string[],
            srcOptions?: { noSpaces?: boolean, caseSensitive?: boolean });

        addPositionCondition(locale: string, name: string, position: TrimType, srcWords: string | string[],
            srcOptions: any);

        addAfterCondition(locale: string, name: string, words: string | string[], opts);
        addAfterFirstCondition(locale: string, name: string, words: string | string[], opts);
        addAfterLastCondition(locale: string, name: string, words: string | string[], opts);
        addBeforeCondition(locale: string, name: string, words: string | string[], opts);
        addBeforeFirstCondition(locale: string, name: string, words: string | string[], opts);
        addBeforeLastCondition(locale: string, name: string, words: string | string[], opts);

        reduceEdges(input: { edges: Entity[], nerRules?: Rule[] }): { entities: Entity[] };

        defaultPipelineProcess(input): Promise<{ entities: Entity[], }>;

        process(srcInput: string): Promise<Output>;

        nameToEntity(name: string): string;

        entityToName(entity: string): string;

        isEntity(entity: string): boolean;

        getEntitiesFromUtterance(utterance: string)
        getEntitiesFromUtterance(locale: string, utterance?: string)
        getEntitiesFromUtterance(locale: string, utterance?: string): string[];

        generateEntityUtterance(locale: string, utterance: string): Promise<string>;

        toJSON(): any;

        fromJSON(json): void;
    }
}
declare module '@nlpjs/nlu'
{
    import { Connector } from '@nlpjs/core'

    export interface NluSettings
    {

    }
}
declare module '@nlpjs/nlg'
{
    import { Connector } from '@nlpjs/core'

    export interface Action
    {

    }
}