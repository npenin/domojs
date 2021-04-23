import Generator from 'yeoman-generator';
import { GeneratorOptions } from 'yeoman-generator'

module.exports = class extends Generator
{
    constructor(args: string | string[], options: GeneratorOptions)
    {
        super(args, options);
        this.argument('name', { default: '', required: true, type: String });
    }

    method1()
    {
        console.log(this.options.name);
    }
}