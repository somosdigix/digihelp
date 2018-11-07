export default class BalaoDeAJuda {
    constructor(listaDeAjuda) {
        this.listaDeAjuda = listaDeAjuda;
        this.elementoNoHtml = document.querySelector('[data-ajuda]');
        this.tipoDeBotao = this.elementoNoHtml.getAttribute('data-ajuda-botao-tipo') ? this.elementoNoHtml.getAttribute('data-ajuda-botao-tipo') : ' botao_medio';
        this.iconeDoBotao = this.elementoNoHtml.getAttribute('data-ajuda-botao-icone') ? this.elementoNoHtml.getAttribute('data-ajuda-botao-icone') : '';
        this.tituloDoBotao = this.elementoNoHtml.getAttribute('data-titulo-ajuda-botao') ? this.elementoNoHtml.getAttribute('data-titulo-ajuda-botao') : 'Precisa de ajuda?';
        this.tituloDoBalao = this.elementoNoHtml.getAttribute('data-ajuda-titulo') ? this.elementoNoHtml.getAttribute('data-ajuda-titulo') : 'Precisa de ajuda?';
        this.iconeFecharBalao = this.elementoNoHtml.getAttribute('data-ajuda-botao-fechar') ? this.elementoNoHtml.getAttribute('data-ajuda-botao-fechar') : ' far fa-times-circle fa-lg';
        this.iconeVoltarBalao = this.elementoNoHtml.getAttribute('data-ajuda-botao-voltar') ? this.elementoNoHtml.getAttribute('data-ajuda-botao-voltar') : ' fas fa-chevron-left fa-lg';
        this.configurarOConteudoDoBalao();
    }

    configurarOConteudoDoBalao() {     
        let informacoesParaMostrar = this.filtrarItensDeAjudaDaUrl();
        let htmlDoConteudo = this.montarHtmlDoConteudo(informacoesParaMostrar);
        this.elementoNoHtml.innerHTML = this.criarConteudoHtmlDoBotaoDeAjuda(htmlDoConteudo);
        this.registrarAcoesNosBotoes();
    }

    criarConteudoHtmlDoBotaoDeAjuda(htmlDoConteudo) {
        return `
                <button data-ajuda-botao class="botao ${this.tipoDeBotao}"><i class="${this.iconeDoBotao}" aria-hidden="true"></i>${this.tituloDoBotao}</button>
                <div class="central-ajuda central-ajuda__oculto" data-central-ajuda>
                    <header class="central-ajuda__cabecalho">
                        <div class="grade__coluna u-margem-esquerda-pequena"> 
                            <a class="u-margem-direita-mini central-ajuda__cursor-indicador central-ajuda__oculto ${this.iconeVoltarBalao}" data-ajuda-voltar></a>
                            <span class="titulo_mini u-texto-negrito">${this.tituloDoBalao}</span>
                        </div>
                        <div class="grade__coluna grade__coluna_estreita central-ajuda__cursor-indicador" data-ajuda-fechar>
                            <a class="u-margem-direita-pequena ${this.iconeFecharBalao}"></a>
                        </div>
                    </header>
                    <div class="central-ajuda__conteudo" data-ajuda-conteudo>
                        ${htmlDoConteudo}
                    </div>
                </div>
            `;
    }

    registrarAcoesNosBotoes() {
        this.registrarAcaoNoBotaoDeAjuda();
        this.registrarAcaoNoBotaoDeFechar();
        this.registrarAcaoNasOpcoesDeAjuda();
        this.registrarAcaoNoBotaoVoltar();
    }

    registrarAcaoNoBotaoDeAjuda() {
        let botaoDeAjuda = this.elementoNoHtml.querySelector('[data-ajuda-botao]');
        botaoDeAjuda.addEventListener('click', () => {
            this.elementoNoHtml.querySelector('[data-central-ajuda]').classList.remove('central-ajuda__oculto');
        });
    }

    registrarAcaoNoBotaoDeFechar() {
        let botaoFechar = this.elementoNoHtml.querySelector('[data-ajuda-fechar]');
        botaoFechar.addEventListener('click', () => {
            this.elementoNoHtml.querySelector('[data-central-ajuda]').classList.add('central-ajuda__oculto');
        });
    }

    registrarAcaoNasOpcoesDeAjuda() {
        let opcoesDeAjuda = document.querySelectorAll('[data-opcao-de-ajuda]');
        opcoesDeAjuda.forEach((opcaoDeAjuda) => {
            opcaoDeAjuda.addEventListener('click', () => {
                let tituloDaOpcaoSelecionada = opcaoDeAjuda.querySelector('[data-opcao-de-ajuda-titulo]').innerText;
                let itemReferenteAOpcaoSelecionada = this.listaDeAjuda.find((itemDeAjuda) => itemDeAjuda.titulo === tituloDaOpcaoSelecionada);
                this.elementoNoHtml.querySelector('[data-ajuda-conteudo]').innerHTML = `
                    <div class="texto_cor-cinza-80 u-padding-pequena">
                        ${itemReferenteAOpcaoSelecionada.conteudo}
                    </div>
                `;
                document.querySelector('[data-ajuda-voltar]').classList.remove('central-ajuda__oculto');
            });
        });
    }

    registrarAcaoNoBotaoVoltar() {
        let botaoVoltar = document.querySelector('[data-ajuda-voltar]');
        botaoVoltar.addEventListener('click', () => {
            this.configurarOConteudoDoBalao();
            this.elementoNoHtml.querySelector('[data-central-ajuda]').classList.remove('central-ajuda__oculto');
        });
    }

    montarHtmlDoConteudo(informacoesParaMostrar) {
        let htmlDoConteudo = '';
        informacoesParaMostrar.forEach((informacaoParaMostrar) => {
            htmlDoConteudo +=  `<div class="central-ajuda__conteudo-item" data-opcao-de-ajuda>
                                    <span class="grade__coluna grade__coluna_estreita u-margem-esquerda-pequena u-margem-direita-pequena texto_cor-info ${informacaoParaMostrar.icone} fa-lg"></span>
                                    <span class="grade__coluna texto_cor-cinza-80" data-opcao-de-ajuda-titulo>${informacaoParaMostrar.titulo}</span>
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