let path = require('path');
let webpackBase = require('./webpackBase.config');

let webpackExemplo = Object.assign(webpackBase, {});

webpackExemplo.entry = {
    teste: ['./test/balaoDeAjuda.spec.js']
};
webpackExemplo.output = {
    path: path.resolve(__dirname, './test/dist'),
    filename: '[name].spec.js'
};

delete webpackExemplo.devtool;

module.exports = webpackExemplo;