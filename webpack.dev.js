const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	externals: [
		nodeExternals({
			whitelist: [/^underscore/],
		}),
	],
	plugins: [
		new NodemonPlugin(),
		new Dotenv({ path: './.env.development.local' }),
	],
});
