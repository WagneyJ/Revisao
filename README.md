# Festival de Degustação Japonesa

Projeto desenvolvido para a disciplina de Desenvolvimento Web I do Instituto Federal de São Paulo (IFSP).

## Descrição

Página web estática criada para divulgar um evento fictício de gastronomia e cultura japonesa.

O projeto apresenta informações sobre o evento, programação, pratos, chefs, vídeo, local e contato, utilizando uma interface responsiva e elementos interativos para facilitar a navegação e tornar a apresentação mais dinâmica.

## Tecnologias

- HTML5
- CSS3
- JavaScript

## Estrutura do projeto

- `index.html` — estrutura e conteúdo da página
- `styles/styles.css` — estilos, layout e responsividade
- `js/script.js` — interações e funcionalidades
- `assets/` — imagens utilizadas no projeto

## Funcionalidades

- Menu de navegação entre as seções
- Navegação suave pela página
- Destaque automático da seção atual no menu
- Contagem regressiva para o evento
- Programação do dia com blocos expansíveis
- Cardápio com imagens e descrições expansíveis
- Informações sobre os chefs com blocos expansíveis
- Vídeo incorporado do YouTube
- Botão para voltar ao topo
- Animações de entrada das seções
- Layout responsivo para diferentes tamanhos de tela

## Padrões e escolhas adotadas

### HTML5

Foi utilizado HTML5 por ser o padrão atual para estruturação de páginas web e por oferecer elementos semânticos que facilitam a organização do conteúdo.

Foram utilizados elementos como:

- `header` para o cabeçalho;
- `nav` para o menu de navegação;
- `main` para o conteúdo principal;
- `section` para separar as áreas da página;
- `article` para conteúdos independentes, como atividades, pratos e chefs;
- `footer` para as informações de contato.

A escolha desses elementos torna a estrutura mais organizada e facilita a compreensão do código.

### CSS3

O CSS foi utilizado para definir a aparência, organização e adaptação da página.

Foram utilizadas **variáveis CSS** para as principais cores:

```css
:root {
    --vermelho: #A10505;
    --cinza: #383838;
    --branco: #FFFFFF;
}