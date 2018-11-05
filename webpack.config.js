let path = require('path');
let webpackBase = require('./webpackBase.config');

let webpackConfig = Object.assign(webpackBase, {});

webpackConfig.entry = {
        digihelp: './app/digihelp.js'
};
webpackConfig.output = {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        libraryExport: 'default'
};

module.exports = webpackConfig;