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
            <div class="central-ajuda">
                <header class="central-ajuda__cabecalho">
                    <div class="grade__coluna"> 
                        <span class="u-margem-esquerda-pequena texto_grande">${this.tituloDoBalao}</span>
                    </div>
                    <div class="grade__coluna grade__coluna_estreita">
                        <span class="u-margem-direita-pequena fal fa-times-circle fa-lg"></span>
                    </div>
                </header>
                <div class="central-ajuda__conteudo">
                    ${htmlDoConteudo}
                </div>
                <div class="central-ajuda__conteudo-contato">
                    <button class="botao botao_medio botao_com-icone-para-esquerda">
                        <i class="fal fa-comment u-margem-direita-mini"></i> Ainda tem dúvidas? Fale conosco
                    </button>
                </div>
            </div>
        `
    }

    montarHtmlDoConteudo(informacoesParaMostrar) {
        let htmlDoConteudo = '';
        informacoesParaMostrar.forEach((informacaoParaMostrar) => {
            htmlDoConteudo +=  `<div class="central-ajuda__conteudo-item">
                                    <span class="grade__coluna grade__coluna_estreita u-margem-esquerda-pequena u-margem-direita-pequena texto_cor-info ${informacaoParaMostrar.icone} fa-lg"></span>
                                    <span class="grade__coluna texto_cor-cinza-80">${informacaoParaMostrar.titulo}</span>
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