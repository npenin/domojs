import Generator from 'yeoman-generator';
import { GeneratorOptions } from 'yeoman-generator'
import path from 'path'

module.exports = class extends Generator
{
    /**
     *
     */
    constructor(args: string | string[], options: GeneratorOptions)
    {
        super(args, options);

        this.argument('name', { default: '', required: true, type: String });
        this.option('packageName', { type: String })
        this.option('scope', { type: String })
    }

    public paths()
    {
        this.sourceRoot(path.join(__dirname, '../../templates/devicetype'))
    }

    public async writing()
    {
        var target = this.destinationPath(this.options.name);
        if (this.options.scope)
        {
            this.config.set('scope', this.options.scope);
            this.config.save();
        }
        var scope = this.config.get('scope');
        this.fs.copyTpl(this.templatePath('package.json'), path.join(target, 'package.json'), { packageName: this.options.packageName || (scope && '@' + scope + '/') + this.options.name });
        this.fs.copy([this.templatePath('tsconfig.json'), this.templatePath('src/index.ts'),
        this.templatePath('src/state.ts'),
        this.templatePath('src/commands/$init.ts'),
        this.templatePath('src/commands/exec.ts'),
        this.templatePath('src/commands/save.ts')
        ], target);
    }
}