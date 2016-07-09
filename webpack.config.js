module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: './lib',
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        // aws-sdk does not (currently) build correctly with webpack - omit
        'aws-sdk': 'aws-sdk'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
}
