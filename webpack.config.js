const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = (env = 'development') => ({
  devtool: 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', inject: true }),
    new webpack.NamedModulesPlugin(),
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: './public',
    publicPath: '/',
    host: '0.0.0.0',
    port: 6001,
    inline: true,
    hot: true,
    noInfo: false,
    stats: 'minimal',
  },
});
