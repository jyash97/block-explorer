const path = require('path');

module.exports = () => ({
	devServer: {
		port: 1358,
		historyApiFallback: true,
		hot: true,
		progress: true,
		open: true,
		contentBase: path.join(__dirname, 'build'),
	},
});
