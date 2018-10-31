export default class BalaoDeAJuda {
    constructor(listaDeAjuda) {
        this.listaDeAjuda = listaDeAjuda;
        this.elementoNoHtml = document.querySelector('[data-ajuda]');
        this.tituloDoBotao = this.elementoNoHtml.getAttribute('data-ajuda-titulo-botao') ? this.elementoNoHtml.getAttribute('data-ajuda-titulo-botao') : 'Precisa de ajuda?';
        this.tituloDoBalao = this.elementoNoHtml.getAttribute('data-ajuda-titulo') ? this.elementoNoHtml.getAttribute('data-ajuda-titulo') : 'Precisa de ajuda?';
        this.configurarOConteudoDoBalao();
    }

    configurarOConteudoDoBalao(botaoDeAjuda) {     
        let informacoesParaMostrar = this.filtrarItensDeAjudaDaUrl();
        let htmlDoConteudo = this.montarHtmlDoConteudo(informacoesParaMostrar);
        this.elementoNoHtml.innerHTML = `
            <button data-ajuda-botao class="botao botao_medio">${this.tituloDoBotao}</button>
            <div class="central-ajuda central-ajuda__oculto">
                <header class="central-ajuda__cabecalho">
                    <div class="grade__coluna"> 
                        <span class="u-margem-esquerda-pequena texto_grande">${this.tituloDoBalao}</span>
                    </div>
                    <div class="grade__coluna grade__coluna_estreita central-ajuda__cursor-indicador" data-ajuda-fechar>
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
        `;
        this.registrarAcaoNoBotaoDeAjuda();
        this.registrarAcaoNoBotaoDeFechar();
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

    registrarAcaoNoBotaoDeAjuda() {
        let botaoDeAjuda = this.elementoNoHtml.querySelector('[data-ajuda-botao]');
        botaoDeAjuda.addEventListener('click', () => {
            this.elementoNoHtml.childNodes[3].classList.remove('central-ajuda__oculto');
        });
    }

    registrarAcaoNoBotaoDeFechar() {
        let botaoFechar = this.elementoNoHtml.querySelector('[data-ajuda-fechar]');
        botaoFechar.addEventListener('click', () => {
            this.elementoNoHtml.childNodes[3].classList.add('central-ajuda__oculto');
        });
    }
}