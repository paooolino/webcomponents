module.exports = {
    entry: './src/index.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: [/\.js$/, /\.jsx$/, /\.es6$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true, 
                    presets: ['react', 'es2015', 'stage-0'] 
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    }
};