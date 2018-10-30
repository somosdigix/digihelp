import './node_modules/digix-ui/ativos/css/digix-ui-base.css';
import BalaoDeAjuda from './balaoDeAjuda';
import { runInThisContext } from 'vm';

export default class DigiHelp {
    constructor(listaDeAjuda) {
        this.balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
    }

    configurarOConteudoDoBalao() {
        this.balaoDeAjuda.configurarOConteudoDoBalao();
    }
}