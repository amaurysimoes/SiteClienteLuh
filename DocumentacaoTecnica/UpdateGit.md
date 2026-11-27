# Subir atualizações no Git

Repositório: https://github.com/amaurysimoes/SiteClienteLuh (branch `main`)

## Dia a dia

```bash
git status                      # ver o que mudou
git add .                       # preparar todas as mudanças
git commit -m "descreva a mudança"
git push                        # enviar para o GitHub
```

Antes de começar a mexer (se alguém alterou pelo GitHub ou outro computador):

```bash
git pull
```

## Desfazer

```bash
git restore caminho/arquivo     # descartar mudança ainda não commitada
git log --oneline               # ver histórico de commits
```

## O que não vai para o Git (`.gitignore`)

- `node_modules/` e `dist/` — gerados por `npm install` e `npm run build`
- `Logomarca/LahBelleLuh.pdf` — 94 MB, perto do limite de 100 MB do GitHub; guardar o original fora do repositório

## Clonar em outro computador

```bash
git clone https://github.com/amaurysimoes/SiteClienteLuh.git
cd SiteClienteLuh
npm install
npm run dev
```

## Site no ar (GitHub Pages)

Endereço: https://amaurysimoes.github.io/SiteClienteLuh/ (abre o site em `.../docs/`)

O GitHub Pages publica a branch `main` pela raiz. O site compilado fica em `docs/`
e o `index.html` da raiz redireciona para lá quando aberto no github.io.

**Toda vez que mudar o site, compile antes de subir:**

```bash
npm run build                   # gera/atualiza a pasta docs/
git add .
git commit -m "descreva a mudança"
git push                        # o site atualiza em 1–2 minutos
```

Sem o `npm run build`, o código sobe, mas o site no ar continua com a versão anterior.
