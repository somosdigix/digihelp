# Digihelp [![Build Status](https://travis-ci.org/somosdigix/digihelp.svg?branch=master)](https://travis-ci.org/somosdigix/digihelp)
## Um componente frontend que cria uma modal de instruções para o usuário.

### Como utilizar

 - Primeiramente instale o Digihelp no seu projeto usando `npm install --save digihelp`
 - Adicione no html da suas paginas onde deseja que o botão de ajuda apereça a tag `<div class="central-ajuda__botao" data-ajuda></div>`
 - Realize o import da biblioteca dentro do seu projeto de acordo com sua necessidade
 - Você Precisa de um arquivo JSON com o padrão a seguir contendo todas as instruções para os usuários e em quais paginas essas instruções devem aparecer
  * Exemplo:
   ```
        [
            {
                "icone": "fas fa-align-left",
                "titulo": "Teste para o pathname /",
                "conteudo": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<a href=\"https://www.google.com\">Ir para o google</a></p>",
                "url": [
                    "/{fim}"
                ]
            },
            {
                "icone": "fas fa-align-left",
                "titulo": "Teste para o hash #!contrato",
                "conteudo": "Conteudo Teste para o hash #!contrato",
                "url": [
                    "#!contrato", "#!contrato/notafiscal/{param}/item/{fim}"
                ]
            }
        ]
   ```
   - Significado de cada chave:
     - icone: Classe css do icone de cada tópico de ajuda
     - titulo: O titulo do tópico de ajuda
     - conteudo: O conteudo em HTML ou texto plano do tópico de ajuda
     - url: Lista de urls onde essa mesma informação deve aparecer
     - As URLs do JSON utilizam os parâmetros `{param}` e `{fim}` para identificar parâmetros do pathname da URL e onde ela termina
 
 - Instancie o Digihelp passando o seu JSON `let digihelp = new Digihelp(JSON)`
 
 - Inicie o componente com o comando `digiHelp.configurarOConteudoDoBalao()`

## Opções de configuração no HTML

 Adicione os atibutos a seguir na tag HTML do componente.
 
 - Para personalizar o conteudo do botão com o texto que preferir `data-ajuda data-titulo-ajuda-botao="texto que preferir"`
 - Para personalizar o conteudo to titulo da modal utilize `data-ajuda-titulo="Titulo que preferir"` 
 - Para personalizar o botão de fechar o modal utilize `data-ajuda-botao-fechar="classe css que preferir"`
 - Para personalizar o botão de voltar do modal utilize `data-ajuda-botao-voltar="classe css que preferir"`

### Se você estiver rodando Linux ou MacOS e obter o erro ENOSPC é só rodar o seguinte comando na pasta do projeto caso você o clone do Github:
 ```
 echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
 ```
