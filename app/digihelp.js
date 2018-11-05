import '../css/main.css';
import '../css/all.css';
import BalaoDeAjuda from './balaoDeAjuda';

export default class DigiHelp {
    constructor(listaDeAjuda) {
        this.balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
    }

    configurarOConteudoDoBalao() {
        this.balaoDeAjuda.configurarOConteudoDoBalao();
    }
}