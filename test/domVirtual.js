const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;

const DEFAULT_HTML = `
<html>
    <head></head>
    <body></body>
</html>`;

const dom = new JSDOM(DEFAULT_HTML, {
    url: 'http://localhost/'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
Object.getOwnPropertyNames(dom.window).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        global[property] = dom.window[property];
    }
});

if (Object.values === undefined) {
    Object.values = (objeto) => Object.keys(objeto).map((chave) => objeto[chave]);
}

window.roteador = {
    rotasRegistradas: new Map()
};