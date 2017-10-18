const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = 'development') => ({
  devtool: 'cheap-module-source-map',
  entry: './lib/es6/src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'public'),
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', inject: true }),
    new webpack.NamedModulesPlugin(),
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
