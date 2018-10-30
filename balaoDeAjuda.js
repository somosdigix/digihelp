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
            htmlDoConteudo += `<div style="cursor: pointer;">
                    <span class="${informacaoParaMostrar.icone}"></span>
                    <span>${informacaoParaMostrar.titulo}</span>
                </div>`
        });
        return htmlDoConteudo;
    }

    filtrarItensDeAjudaDaUrl() {        
        let hashAtual = window.location.hash.length > 0 ? window.location.hash : undefined;
        let pathAtual = window.location.pathname === '/' && hashAtual === undefined ? window.location.pathname : undefined;
        return this.listaDeAjuda.filter((itemDaListaDeAjuda) => itemDaListaDeAjuda.url.includes(pathAtual) || itemDaListaDeAjuda.url.includes(hashAtual));
    }
}