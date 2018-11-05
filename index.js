import DigiHelp from './app/digihelp';
import listaDeAjuda from './listaDeAjuda.json';

console.log(DigiHelp);

let digiHelp = new DigiHelp(listaDeAjuda);

window.onhashchange = () => {
    digiHelp.configurarOConteudoDoBalao();
};