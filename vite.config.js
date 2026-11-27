import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

const stripPagesRedirect = {
  name: 'strip-pages-redirect',
  apply: 'build',
  transformIndexHtml: (html) => html.replace(/\s*<!-- github-pages-redirect:start -->[\s\S]*?<!-- github-pages-redirect:end -->/, ''),
};

export default defineConfig({
  base: './',
  plugins: [
    react(),
    stripPagesRedirect,
    legacy({ targets: ['defaults', 'Android >= 5', 'Chrome >= 49', 'iOS >= 10'], modernPolyfills: true }),
  ],
  build: { outDir: 'docs', emptyOutDir: true },
});
