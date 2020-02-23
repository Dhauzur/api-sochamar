const path = require('path');

module.exports = () => {
	return {
		target: 'node',
		entry: { server: path.resolve(__dirname, './src') },
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										targets: {
											node: '12.16.0',
											esmodules: false,
										},
									},
								],
							],
						},
					},
				},
			],
		},
	};
};