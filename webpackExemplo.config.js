let path = require('path');
let webpackBase = require('./webpackBase.config');

let webpackExemplo = Object.assign(webpackBase, {});

webpackExemplo.entry = {
    exemplo: './exemplo.js'
};
webpackExemplo.output = {
    path: path.resolve(__dirname, 'exemploDist'),
    filename: '[name].js'
};

module.exports = webpackExemplo;
