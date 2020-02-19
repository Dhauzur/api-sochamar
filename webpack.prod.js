const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'production',
	externals: [
		nodeExternals({
			whitelist: [/^underscore/],
		}),
	],
	plugins: [
		new Dotenv({ path: './.env.production.local' }),
		new MinifyPlugin(),
		new CopyPlugin([{ from: './src/uploads', to: './uploads' }]),
		new webpack.DefinePlugin({
			$dirname: '__dirname',
		}),
	],
});
