import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      target: 'esnext',
    },
    plugins: [
      react({
        babel: {
          plugins: [
            // для декораторов ts-serializable
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
          ],
        },
      }),
      svgr() as PluginOption,
      visualizer({
        template: 'treemap', // or sunburst
        open: false,
        gzipSize: true,
        brotliSize: false,
        filename: 'analise.html',
      }) as PluginOption,
      // Для решении проблемы с HMR при цикличном импорте (при импорте routes.ts)
      // https://github.com/vitejs/vite/issues/3033#issuecomment-1360691044
      // Возможно есть нюанс
      {
        name: 'singleHMR',
        handleHotUpdate({ modules }) {
          modules.map((m) => {
            m.importedModules = new Set();
            m.importers = new Set();
          });

          return modules;
        },
      },
    ],
    resolve: {
      alias: {
        '~assets': path.resolve(__dirname, './public/assets'),
        '~': path.resolve(__dirname, './src'),
        '~base': path.resolve(__dirname, './src/base'),
        '~helpers': path.resolve(__dirname, './src/helpers'),
        '~hooks': path.resolve(__dirname, './src/hooks'),
        '~modules': path.resolve(__dirname, './src/modules'),
        '~routes': path.resolve(__dirname, './src/routes'),
        '~screens': path.resolve(__dirname, './src/screens'),
        '~styles': path.resolve(__dirname, './src/styles'),
        '~typings': path.resolve(__dirname, './src/typings'),
        '~components': path.resolve(__dirname, './src/components'),
      },
    },
  };
});
