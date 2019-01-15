import Draggble from 'draggable';

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
                        <div class="grade__coluna-central-ajuda u-margem-esquerda-pequena"> 
                            <a class="u-margem-direita-mini central-ajuda__cursor-indicador central-ajuda__oculto ${this.iconeVoltarBalao}" data-ajuda-voltar></a>
                            <span class="titulo_mini u-texto-negrito">${this.tituloDoBalao}</span>
                        </div>
                        <div class="grade__coluna-central-ajuda grade__coluna_estreita-central-ajuda central-ajuda__cursor-indicador" data-ajuda-fechar>
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
            this.configurarElementoComoArrastavel();
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
                let tituloDaOpcaoSelecionada = opcaoDeAjuda.querySelector('[data-opcao-de-ajuda-titulo]').innerHTML;
                let itemReferenteAOpcaoSelecionada = this.listaDeAjuda.find((itemDeAjuda) => itemDeAjuda.titulo === tituloDaOpcaoSelecionada);
                this.elementoNoHtml.querySelector('[data-ajuda-conteudo]').innerHTML = `
                    <div class="texto_cor-cinza-80 u-padding-pequena" data-ajuda-conteudo-do-topico>
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
            this.configurarElementoComoArrastavel();
        });
    }

    montarHtmlDoConteudo(informacoesParaMostrar) {
        let htmlDoConteudo = '';
        informacoesParaMostrar.forEach((informacaoParaMostrar) => {
            htmlDoConteudo +=  `<div class="central-ajuda__conteudo-item" data-opcao-de-ajuda>
                                    <span class="grade__coluna-central-ajuda grade__coluna_estreita-central-ajuda u-margem-esquerda-pequena u-margem-direita-pequena texto_cor-info ${informacaoParaMostrar.icone} fa-lg"></span>
                                    <span class="grade__coluna-central-ajuda texto_cor-cinza-80" data-opcao-de-ajuda-titulo>${informacaoParaMostrar.titulo}</span>
                                </div>`
        });
        return htmlDoConteudo;
    }

    filtrarItensDeAjudaDaUrl() {        
        let itensDeAjudaFiltrados = [];
        let urlAtual = this.obterUrlAtual();
        this.listaDeAjuda.forEach((itemDaListaDeAjuda) => {
            itemDaListaDeAjuda.url.forEach((urlDoItemDaListaDeAjuda) => {
                let urlComRegex = urlDoItemDaListaDeAjuda.split('{param}').join('([^}]+)');
                urlComRegex = urlComRegex.replace('{fim}', '$');
                if(urlAtual.match(urlComRegex) && !itensDeAjudaFiltrados.includes(itemDaListaDeAjuda)) {                    
                    itensDeAjudaFiltrados.push(itemDaListaDeAjuda);
                }
            });
        });
        return itensDeAjudaFiltrados;
    }

    obterUrlAtual() {
        let urlAtual = window.location.href;
        if(urlAtual[urlAtual.length - 1] !== '/') {
            urlAtual = urlAtual + '/';
        }
        return urlAtual;
    }

    configurarElementoComoArrastavel() {
        let posicaoAnteriorDoElementoArrastavel = this.obterAUltimaPosicaoDoElementoArrastavel();
        let balaoDeAJuda = this.elementoNoHtml.querySelector('[data-central-ajuda]');
        let cabecalhoDoBalaoDeAjuda = balaoDeAJuda.querySelector('header');
        this.elementoArrastavel = new Draggble(balaoDeAJuda, {
            useGPU: true,
            handle: cabecalhoDoBalaoDeAjuda
        });
        if(posicaoAnteriorDoElementoArrastavel) {
            this.elementoArrastavel.set(posicaoAnteriorDoElementoArrastavel.x, posicaoAnteriorDoElementoArrastavel.y);
        }
        balaoDeAJuda.style.height = 'auto';
    }

    obterAUltimaPosicaoDoElementoArrastavel() {
        let posicaoAnteriorDoElementoArrastavel;
        if(this.elementoArrastavel) {
            posicaoAnteriorDoElementoArrastavel = this.elementoArrastavel.get();
            this.elementoArrastavel.destroy();
        }
        return posicaoAnteriorDoElementoArrastavel;
    }

}