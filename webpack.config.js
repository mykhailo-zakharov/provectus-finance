
const path = require('path');
const webpack = require('webpack');
const ENV = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const historyApiFallback = require('connect-history-api-fallback');

console.log("Your lifecycle event: " + process.env.npm_lifecycle_event);
console.log("Your process.env: " + ENV);

module.exports = {

    entry: [
        './src/index',
        './src/style.scss'
    ],

    output: {
        path: path.join(__dirname, "/web/build/"),
        filename: 'bundle.js',
        publicPath: '/web/build/',
        library : '[name]'
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.sass', '.scss']
    },

    watch: true,

    devtool: 'cheap-source-map',

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplate: ['*-loader'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-runtime', 'add-module-exports', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.(eot|woff|ttf|svg|png|jpg|gif)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
            {
                test: /(\.scss|\.css)$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    "css!sass"
                )
            },
            {
              test: /\.json$/,
              loader: "json-loader",
            }
        ]
    },
    postcss: [
      autoprefixer({
        browsers: ['last 20 versions', ' > 1%']
      })
    ],

    plugins: [
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                server: {
                	baseDir: ['web'],
					middleware: [ historyApiFallback() ]
                }
            },
            {
                reload: true
            }
        ),

        new CleanWebpackPlugin(['web/build'], {
            root: '',
            verbose: true,
            dry: false,
            exclude: ['shared.js']
        }),

        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            },

            __DEBUG__: ENV === 'DEBUG',
            __DEVELOPMENT__: true,
            __PRODUCTION__ : false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("bundle.css", { allChunks: true }),
        new webpack.NoErrorsPlugin()
    ]
}

