const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.js'), // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'app.bundle.js', // Output filename
  },
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: path.resolve(__dirname, "node_modules"),// Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use babel-loader for compiling
          options: {
            presets: ['@babel/preset-env'] // Use @babel/preset-env for modern JavaScript features
          }
        }
      }
    ]
  },
  resolve: { 
    fallback: { 

    }
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  externals: [nodeExternals()],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
