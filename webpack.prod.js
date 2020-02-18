const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	externals: [
		nodeExternals({
			whitelist: [/^underscore/],
		}),
	],
	plugins: [new Dotenv(), new MinifyPlugin()],
});
