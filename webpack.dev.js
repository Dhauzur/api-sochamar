const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	externals: [
		nodeExternals({
			whitelist: [/^underscore/],
		}),
	],
	plugins: [
		new NodemonPlugin({ nodeArgs: ['--inspect=127.0.0.1:9229'] }),
		new Dotenv({ path: './.env.development.local' }),
		new CopyPlugin([{ from: './src/uploads', to: './uploads' }]),
		new webpack.DefinePlugin({
			$dirname: '__dirname',
		}),
	],
});
