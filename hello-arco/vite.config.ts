import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite"
import { ArcoResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import { vitePluginForArco } from "@arco-plugins/vite-vue"
import * as path from "path"

const pathResolve = (dir: string) => path.resolve(__dirname, `./${dir}`)

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    // 需要忽略的文件后缀
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"], 
    // 配置路径别名
    alias: [
      { find: "@", replacement: pathResolve("src") },
      { find: "vue", replacement: "vue/dist/vue.esm-bundler.js" },
    ],
  },
  
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve("src/assets/style/breakpoint.less")}";`,
        },
        javascriptEnabled: true,
      },
    },
  },

  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [ArcoResolver()],
    }),
    // 组件按需引入
    Components({
      resolvers: [ArcoResolver({ sideEffect: true })],
    }),
    // 样式按需引入
    vitePluginForArco({}),
  ],
  server: {
    host: "0.0.0.0",
    port: 3091,
    open: false,
    proxy: {
      "/api": {
        target: "http://localhost:8120",
        changeOrigin: true,
      },
    },
  },
})
