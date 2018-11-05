import DigiHelp from './dist/digihelp';
import listaDeAjuda from './listaDeAjuda.json';

console.log(DigiHelp);
let digiHelp = new DigiHelp(listaDeAjuda);

window.onhashchange = () => {
    digiHelp.configurarOConteudoDoBalao();
};