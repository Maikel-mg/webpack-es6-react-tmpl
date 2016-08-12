var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src');
var ROOT_DIR = path.resolve(__dirname);
var BUILD_DIR = path.resolve(__dirname, 'build');  

module.exports = {
    entry : APP_DIR + '/index.js',
    output : {
        path : BUILD_DIR,
        filename : 'bundle.js'
    },
    module : {
        preLoaders: [
            {
                test: /\.js?$/,
                loaders: ['eslint'],
                include: APP_DIR
            }
        ],
        loaders : [
            {
                test : /\.css$/,
                loader: 'style!css'
            },
            {
                test : /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }  
            }
        ]
    }
};