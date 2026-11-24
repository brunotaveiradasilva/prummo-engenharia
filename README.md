# Prummo Engenharia — site de portfólio

Site de apresentação da Prummo Engenharia, escritório de projetos hidrossanitários, elétricos e de piscina modelados em 3D (BIM). Mostra quem é a empresa, os serviços, os projetos entregues, o trabalho em campo e onde já projetou, com contato direto por WhatsApp e Instagram.

**[▶ Abrir o site](https://brunotaveiradasilva.github.io/prummo-engenharia/)**

![Página inicial](docs/screenshots/inicio.png)

## Seções

| Seção | O que mostra |
| --- | --- |
| **Início** | Logo desenhado em linha, frase digitada e marca d'água PRUMMO deslizando ao fundo |
| **Sobre** | A empresa e a equipe |
| **Serviços** | Carta de serviços com ilustração isométrica |
| **Realizações** | Lista de projetos; cada um abre um modal com galeria, área, local e disciplinas |
| **Foco** e **Conhecimento** | Fotos do trabalho em campo, com rolagem horizontal |
| **Onde projetamos** | Mapa do Brasil em SVG com os estados atendidos |
| **Contato** | WhatsApp, Instagram e QR code |

## Organização

Site estático, sem build: o GitHub Pages publica direto a raiz da `main`.

```
├── index.html                # todas as seções e o mapa em SVG
├── css/style.css             # identidade visual, layout e responsivo
├── js/main.js                # dados dos projetos, modal, menu e animações (GSAP + ScrollTrigger)
├── assets/
│   ├── img/                  # fotos e renders dos projetos, equipe e obra
│   └── icons/                # favicon e ícone para iPhone
└── docs/screenshots/         # prints usados neste README
```

### Decisões que valem destacar

- **Projetos como dados:** a lista de realizações e o conteúdo de cada modal vêm do array `PROJECTS` em `js/main.js`. Para incluir um projeto, basta um objeto novo e as imagens em `assets/img/`.
- **Animações guiadas pela rolagem** com GSAP 3 + ScrollTrigger, carregados por CDN.
- **Funciona sem animação:** com `prefers-reduced-motion` ou se o GSAP não carregar, o conteúdo aparece direto no lugar final, sem depender de JavaScript para ficar legível.
- **Sem dependências para instalar:** HTML, CSS e JavaScript puros.

## Rodando localmente

Basta abrir o `index.html` no navegador. Para servir por HTTP (como no Pages):

```bash
git clone https://github.com/brunotaveiradasilva/prummo-engenharia.git
cd prummo-engenharia
python -m http.server 8000
```

E abrir `http://localhost:8000`.

## Deploy

GitHub Pages servindo a branch `main`, pasta raiz. Cada push na `main` publica sozinho. O arquivo `.nojekyll` evita o processamento do Jekyll.

## Onde editar

- Projetos (título, área, local, disciplinas, fotos): array `PROJECTS` em `js/main.js`
- Textos das seções e links de contato: `index.html`
- Cores, fontes e espaçamentos: variáveis no início de `css/style.css`

## Stack

HTML · CSS · JavaScript · GSAP · ScrollTrigger · GitHub Pages
