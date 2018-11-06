import '../css/all.css';
import '../css/main.css';
import BalaoDeAjuda from './balaoDeAjuda';

export default class DigiHelp {
    constructor(listaDeAjuda) {
        this.balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
    }

    configurarOConteudoDoBalao() {
        this.balaoDeAjuda.configurarOConteudoDoBalao();
    }
}