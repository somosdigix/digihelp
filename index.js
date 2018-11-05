import DigiHelp from './app/digihelp';
import listaDeAjuda from './listaDeAjuda.json';

let digiHelp = new DigiHelp(listaDeAjuda);

window.onhashchange = () => {
    digiHelp.configurarOConteudoDoBalao();
};