import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from "node:url";
import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    UnoCSS({
      configFile: './uno.config.ts',
    }),
    AutoImport({ 
      imports: ["vue"],
      dts: "src/auto-import.d.ts",
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ],
})
