export default class BalaoDeAJuda {
    constructor(listaDeAjuda) {
        this.listaDeAjuda = listaDeAjuda;
        this.elementoNoHtml = document.querySelector('[data-ajuda]');
        this.tituloDoBalao = this.elementoNoHtml.getAttribute('data-ajuda-titulo') ? this.elementoNoHtml.getAttribute('data-ajuda-titulo') : 'Precisa de ajuda?';
        this.configurarOConteudoDoBalao();
    }

    configurarOConteudoDoBalao() {     
        let informacoesParaMostrar = this.filtrarItensDeAjudaDaUrl();
        let htmlDoConteudo = this.montarHtmlDoConteudo(informacoesParaMostrar);
        this.elementoNoHtml.innerHTML = `
            <div>
                <header>
                    <span>${this.tituloDoBalao}</span>
                    <button>Fechar</button>
                </header>
                <div>
                    ${htmlDoConteudo}
                </div>
            </div>
        `
    }

    montarHtmlDoConteudo(informacoesParaMostrar) {
        let htmlDoConteudo = '';
        informacoesParaMostrar.forEach((informacaoParaMostrar) => {
            htmlDoConteudo += `<div>
                    <span class="${informacaoParaMostrar.icone}"></span>
                    <span>${informacoesParaMostrar.titulo}</span>
                </div>`
        });
        return htmlDoConteudo;
    }

    filtrarItensDeAjudaDaUrl() {
        let pathAtual = window.location.pathname;
        let hashAtual = window.location.hash;
        return this.listaDeAjuda.filter((itemDaListaDeAjuda) => [pathAtual, hashAtual].includes(itemDaListaDeAjuda.url));
    }
}