const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin')
const CssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        main: './src/client/index.ts',
        sw: './src/client/sw.ts'
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: '[name].js',
    },
    resolve: {
        aliasFields: ['browser'],
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".scss"],
        symlinks: false,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss?$/,
                use: [CssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanPlugin(),
        new HtmlPlugin({ title: 'Output management', xhtml: true, hash: true, inject: true, template: 'views/index.html', excludeChunks: ['sw'] }),
        new CssExtractPlugin({ moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`, })
    ],
    devtool: 'source-map',
    mode: 'development',
    optimization: {
        usedExports: true,
        namedModules: true,
        namedChunks: true,
        sideEffects: true,
    },
    // externals: {
    //     '@popperjs/core': {
    //         commonjs: '@popperjs/core',
    //         commonjs2: '@popperjs/core',
    //         amd: '@popperjs/core',
    //         root: 'Popper'
    //     },
    //     'showdown': {
    //         commonjs: 'showdown',
    //         commonjs2: 'showdown',
    //         amd: 'showdown',
    //         root: 'showdown',
    //     },
    // },
}