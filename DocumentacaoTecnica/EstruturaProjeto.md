# Estrutura do projeto La Belle Luh

Organização adotada como padrão para este site Vite + React, seguindo a estrutura do Polly & Rr-site.

```text
LaBelleLu-site/
├── app_android/                 # app Android (Capacitor) com o mesmo código do site
│   ├── android/                 # projeto nativo (ícones, tela de abertura, Gradle)
│   ├── capacitor.config.json
│   └── package.json             # scripts web / sync / apk
├── docs/                        # site compilado publicado no GitHub Pages
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

`node_modules/` aparece depois de `npm install`. `npm run build` gera `docs/`, que é versionada porque o GitHub Pages publica dali. Em `app_android/`, as pastas `www/`, `apk/` e `node_modules/` são geradas e ficam fora do Git.

As imagens originais estão em `img/`. As versões WebP servidas pela página ficam em `public/images/` para serem carregadas pelo navegador sem importações extras.

## App Android

- Compatível do **Android 5.1 (API 22)** ao mais recente; compilado para o Android 14 (API 34).
- O build web inclui um pacote com polyfills para WebViews antigas (`@vitejs/plugin-legacy`).
- Pré-requisitos: JDK 17 e Android SDK (platform 34).

```bash
cd app_android
npm install                      # só na primeira vez
npm run apk                      # gera app_android/apk/LaBelleLuh.apk
```

O APK gerado é de depuração (instalação direta no celular). Para publicar na Play Store é preciso gerar um AAB assinado com chave própria e atualizar o `targetSdkVersion` para o mínimo exigido pela loja.
