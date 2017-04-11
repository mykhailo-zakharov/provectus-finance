
const webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    entry: [
        './src/index',
        './src/style.scss'
    ],

    output: {
        path: path.join(__dirname, "/web/build/"),
        publickPath: '/web/build/',
        filename: 'bundle.js',
        library : '[name]'
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.sass']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplate: ['*-loader'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-decorators-legacy', 'transform-runtime']
                }
            },
            {
                test: /\.(eot|woff|ttf|png|jpg|gif)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
            {
                test: /\.svg/, loader: 'svg-url-loader'
            },
            {
                test: /\.scss$/,
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
        new ExtractTextPlugin("bundle.css", { allChunks: true }),
        new CleanWebpackPlugin(['web/build'], {
          root: '',
          verbose: true,
          dry: false,
          exclude: ['shared.js']
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            },

            __DEVELOPMENT__: false,
            __PRODUCTION__ : true
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            minimize: true,
            compress:{
                warnings: true
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessorOptions: { discardComments: {removeAll: true } }
        })
    ]
};
