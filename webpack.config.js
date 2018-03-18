const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'manifest.json', to: 'manifest.json'},
            {from: 'erm-styles.css', to: 'erm-styles.css'}
        ])
    ],
    devtool: 'eval-source-map'
};