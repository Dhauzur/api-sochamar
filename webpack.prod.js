const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	resolve: {
		alias: {
			'@': path.join(__dirname, './src/'),
		},
	},
	externals: [
		nodeExternals({
			whitelist: [/^underscore/],
		}),
	],
	plugins: [
		new Dotenv({ defaults: true }),
		new MinifyPlugin(),
		new CopyPlugin([{ from: './src/uploads', to: './uploads' }]),
		new webpack.DefinePlugin({
			$dirname: '__dirname',
		}),
	],
});
