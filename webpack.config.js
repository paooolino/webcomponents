module.exports = {
    entry: './src/index.jsx',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: 'build',
        host: process.env.host || '0.0.0.0',
        //port: process.env.port,
        port: 8082,
        inline: true
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules',
                include: /flexboxgrid/,
            },
            {
                test: [/\.js$/, /\.jsx$/, /\.es6$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true, 
                    presets: ['react', 'es2015', 'stage-0'] 
                }
            },
            { test: /\.jpg$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    }
};