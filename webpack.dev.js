const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devtool: 'inline-source-map',
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
		new NodemonPlugin({ nodeArgs: ['--inspect=127.0.0.1:9229'] }),
		new Dotenv({ defaults: true, silent: true }),
		new CopyPlugin([{ from: './src/uploads', to: './uploads' }]),
		new webpack.DefinePlugin({
			$dirname: '__dirname',
		}),
	],
});
