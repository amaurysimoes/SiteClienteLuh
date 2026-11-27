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

Endereço: https://amaurysimoes.github.io/SiteClienteLuh/

- Em **Settings → Pages → Build and deployment → Source**, deixar **GitHub Actions** (não "Deploy from a branch").
- Todo `git push` na `main` roda `.github/workflows/deploy.yml`, que faz `npm run build` e publica a pasta `dist`.
- Acompanhe em **Actions** no GitHub; leva 1–2 minutos.
