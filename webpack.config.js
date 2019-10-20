const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteWebPackPlugin = require('write-file-webpack-plugin');

// eslint-disable-next-line
const configFile = mode => require(`./build-config/webpack.${mode}.js`)(mode);

module.exports = () => {
	const mode = process.env.NODE_ENV;
	return webpackMerge(
		{
			mode,
			entry: path.join(__dirname, 'src/index.js'),
			output: {
				path: path.resolve(__dirname, 'build'),
				filename: mode === 'development' ? '[name].js' : '[name].[contenthash].js',
				publicPath: '/',
			},
			optimization: {
				splitChunks: {
					cacheGroups: {
						// Splitting React into a different bundle
						common: {
							test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
							name: 'common',
							chunks: 'all',
						},
					},
				},
			},
			plugins: [
				new HtmlWebpackPlugin({
					template: './public/index.html',
					alwaysWriteToDisk: true,
				}),
				new CleanWebpackPlugin(),
				new CopyWebpackPlugin([
					'./public/favicon.ico',
					'./public/manifest.json',
					'./public/_redirects',
					{ from: 'public/aragon-ui', to: 'aragon-ui' },
				]),
				new WriteWebPackPlugin(),
			],
			module: {
				rules: [
					{
						test: /\.js$/,
						use: ['babel-loader'],
						exclude: /node_modules/,
					},
					{
						test: /\.css$/,
						use: ['style-loader', 'css-loader'],
					},
					{
						test: /\.(png|jpe?g|gif|svg)$/,
						use: {
							loader: 'file-loader',
						},
					},
				],
			},
		},
		configFile(mode),
	);
};
