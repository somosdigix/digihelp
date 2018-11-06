import BalaoDeAjuda from '../app/balaoDeAjuda';
import chai from 'chai';
let expect = chai.expect;

describe('Balão de ajuda', () => { 

    let listaDeAjuda;

    beforeEach(() => {
        document.body.innerHTML = '<div data-ajuda></div>';
        listaDeAjuda = [{
            icone: "fas fa-align-left",
            titulo: "Teste para o pathname /",
            conteudo: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<a href=\"https://www.google.com\">Ir para o google</a></p>",
            url: [
                "http://localhost/{fim}"
            ]
        }];
    });

    it('deve renderizar os topicos disponiveis para a url atual', () => {
        let textoDoTopicoEsperado = listaDeAjuda[0].titulo;
        let balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
        
        balaoDeAjuda.configurarOConteudoDoBalao();
        let topicosDeAjudaRenderizados = document.querySelectorAll('[data-opcao-de-ajuda]');
        let textoDoTopicoRenderizado = topicosDeAjudaRenderizados[0].querySelector('[data-opcao-de-ajuda-titulo]').innerHTML;

        expect(textoDoTopicoEsperado).to.be.equal(textoDoTopicoRenderizado);
    });

    it('deve mostrar o balão quando clicar no botão de ajuda', () => {
        let balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
        balaoDeAjuda.configurarOConteudoDoBalao();

        document.querySelector('[data-ajuda-botao]').click();
        let balaoEstaInvisivel = document.querySelector('[data-central-ajuda]').className.includes('central-ajuda__oculto');
        
        
        expect(balaoEstaInvisivel).to.be.false;
    });
    
    it('deve esconder o balão quando clicar no botão fechar', () => {
        let balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
        balaoDeAjuda.configurarOConteudoDoBalao();

        document.querySelector('[data-ajuda-botao]').click();
        document.querySelector('[data-ajuda-fechar]').click();
        let balaoEstaInvisivel = document.querySelector('[data-central-ajuda]').className.includes('central-ajuda__oculto');
        
        
        expect(balaoEstaInvisivel).to.be.true;
    });

    it('deve mostrar o conteudo de um topico quando selecionado', () => {
        let conteudoEsperado = listaDeAjuda[0].conteudo.trim();
        let balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
        balaoDeAjuda.configurarOConteudoDoBalao();

        document.querySelector('[data-opcao-de-ajuda=""]').click();
        let conteudoDoBalao = document.querySelector('[data-ajuda-conteudo-do-topico]').innerHTML.trim();

        expect(conteudoEsperado).to.be.equal(conteudoDoBalao);
    });

    it('deve voltar para a lista de tópicos quando clicar no botão de voltar', () => {
        let textoDoTopicoEsperado = listaDeAjuda[0].titulo;
        let balaoDeAjuda = new BalaoDeAjuda(listaDeAjuda);
        balaoDeAjuda.configurarOConteudoDoBalao();
        
        document.querySelector('[data-opcao-de-ajuda=""]').click();
        document.querySelector('[data-ajuda-voltar]').click();
        let topicosDeAjudaRenderizados = document.querySelectorAll('[data-opcao-de-ajuda]');
        let textoDoTopicoRenderizado = topicosDeAjudaRenderizados[0].querySelector('[data-opcao-de-ajuda-titulo]').innerHTML;

        expect(textoDoTopicoEsperado).to.be.equal(textoDoTopicoRenderizado);
    });

});