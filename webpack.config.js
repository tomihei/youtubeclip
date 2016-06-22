var path = require('path');
var webpack = require('webpack');

module.exports = {
    // エントリーポイント
    entry: './src/cli/ts/main.ts',
    // 出力先
    dest: './public/javascripts',
    // 出力するファイル名
    output: {
        filename: 'bundle.js'
    },
    // 依存関係
    resolve: {
        root:[path.join(__dirname, 'public/components')],
        extensions:['', '.webpack.js', 'web.js', '.js', '.ts']
    },
    // bowerで取得したライブラリの読み込み用プラグイン
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
    ],
    // TypeScriptを読み込むためのloader
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}
