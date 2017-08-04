var webpack = require('webpack');
var ngAnotatePlugin = require('ng-annotate-webpack-plugin');
require('dotenv').config();
var debug = process.env.NODE_ENV !== 'production'

module.exports = {
	context: __dirname + '/client/root',
	devtool: debug ? 'inline-sourcemap' : false,
	entry: './app.js',
	output: {
		path: __dirname + '/client',
		filename: 'app.min.js'
	},
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader']},
			{ test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'}
		],
	},
	plugins: debug ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ngAnotatePlugin({add: true}),
		new webpack.optimize.UglifyJsPlugin({mangle: true, sourcemap: false, compress: {warnings: false}})
	]
}