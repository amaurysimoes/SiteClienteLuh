# Estrutura do projeto La Belle Luh

Organização adotada como padrão para este site Vite + React, seguindo a estrutura do Polly & Rr-site.

```text
LaBelleLu-site/
├── app_android/                 # espaço reservado para a versão Android/Capacitor
├── DocumentacaoTecnica/         # documentação do projeto
│   └── EstruturaProjeto.md
├── img/                         # imagens originais e arquivos fonte da marca
├── public/                      # arquivos publicados diretamente pelo Vite
│   └── images/                  # fotos otimizadas usadas pela página
├── src/
│   ├── App.jsx                  # composição da página
│   ├── main.jsx                 # entrada React
│   ├── index.css                # estilos globais e responsivos
│   ├── assets/                  # assets importados pelo código
│   ├── components/              # componentes reutilizáveis
│   └── data/                    # conteúdo e dados separados da interface
├── index.html
├── package.json
├── vite.config.js
├── Models.md                    # perfis e prompts de continuidade das modelos
└── README.md
```

`node_modules/` aparece depois de `npm install` e `dist/` depois de `npm run build`. Os dois são saídas geradas e ficam fora do controle de versão. A pasta `app_android/` está reservada; sua estrutura interna será criada quando o app Android for configurado.

As imagens originais estão em `img/`. As versões WebP servidas pela página ficam em `public/images/` para serem carregadas pelo navegador sem importações extras.
