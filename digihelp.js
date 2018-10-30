import './node_modules/digix-ui/ativos/css/digix-ui-base.css';
import BalaoDeAjuda from './balaoDeAjuda';

export default class DigiHelp {
    constructor(listaDeAjuda) {
        this.balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
    }
}