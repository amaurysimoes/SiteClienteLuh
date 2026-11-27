import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O redirecionamento do index.html da raiz só serve para o GitHub Pages;
// ele é removido do site compilado (docs/index.html).
const stripPagesRedirect = {
  name: 'strip-pages-redirect',
  apply: 'build',
  transformIndexHtml: (html) => html.replace(/\s*<!-- github-pages-redirect:start -->[\s\S]*?<!-- github-pages-redirect:end -->/, ''),
};

// base relativa: funciona em amaurysimoes.github.io/SiteClienteLuh/docs/ e localmente.
// O build vai para docs/, que é commitado e publicado pelo GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react(), stripPagesRedirect],
  build: { outDir: 'docs', emptyOutDir: true },
});
