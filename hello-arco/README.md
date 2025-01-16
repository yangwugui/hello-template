# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

### 1 从头创建项目

#### 1.1 pnpm create vite

```
Project name: hello-arco
Select a framework: vue
Select a variant: TypeScript
```

默认生成的package.json如下：

```json
{
  "name": "demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue/tsconfig": "^0.7.0",
    "typescript": "~5.6.2",
    "vite": "^6.0.5",
    "vue-tsc": "^2.2.0"
  }
}
```

其中，vue-tsc用于类型检查，最终构建时往往不需要类型检查，一般在开发阶段ide已经提供了实时的类型错误信息，所以上述文件中的build调整为以下两个：

```json
    "build": "vite build",
    "build-tsc": "vue-tsc -b && vite build",
```

tsc的参数 -b，表示配置文件使用默认的值，即当前目录下的tsconfig.json, 可以在 -b 后指定配置文件，如：

```shell
 > tsc -b                            # Use the tsconfig.json in the current directory
 > tsc -b src                        # Use src/tsconfig.json
 > tsc -b foo/prd.tsconfig.json bar  # Use foo/prd.tsconfig.json and bar/tsconfig.json
```

#### 1.2 tsconfig.json

预先配置好的 `tsconfig.json`的底层配置抽象于 [`@vue/tsconfig`](https://github.com/vuejs/tsconfig) 包中。在项目内我们使用 [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html) 来确保运行在**不同环境下的代码的类型正确** (比如应用代码和测试代码应该有不同的全局变量)。tsconfig中的references不同于extends，references是对不同的代码分别配置，而extends是继承配置。

参考一下文档：

https://cn.vuejs.org/guide/typescript/overview.html#configuring-tsconfig-json

https://www.typescriptlang.org/docs/handbook/project-references.html#tsc--b-commandline

### 2 路径别名设置

#### 2.1 vite.config.ts中设置路径别名

```ts
import * as path from "path"

const pathResolve = (dir: string) => path.resolve(__dirname, `./${dir}`)

resolve: {
    // 需要忽略的文件后缀
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"], 
    // 配置路径别名
    alias: [
      { find: "@", replacement: pathResolve("src") },
      { find: "vue", replacement: "vue/dist/vue.esm-bundler.js" },
    ],
},

```

说明：

1. 不要轻易忽略导入文件的扩展名，vite规范中的默认值除了上述扩展名外，还忽略了 ".json"。提倡import时明确指定文件扩展名。不要忽略.vue的组件文件扩展名。
2. 源文件目录src，似乎现在一些模板都用@符号，是否用 ~ 更好？因为现在npm 的 package管理中用@来区分不同 orgnization 的包。

#### tsconfig.app.json中设置路径别名：

```
"compilerOptions": {
    "paths": {
		"@/*": ["./src/*"]
	},
}
```

### 3 开发服务器设置

前后端分离开发时，发出api调用需要用代理放到当前的前端域名和端口下。

```ts
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
```

proxy中的设置根据需要调整。

### 4 项目文件夹

#### 4.1 public

#### 4.2 src

- App.vue

- init.ts

- main.ts

  把程序启动时需要首先执行的脚本放到init.ts中，用下述import语句实现初始化。

  ```
  import "./init"
  ```

- index.html, 单页应用的入口页面。

#### 4.3 src/api

#### 4.4 src/assets

#### 4.5 src/common

#### 4.6 src/config

#### 4.7 src/hooks

#### 4.8 src/layout/

#### 4.9 src/router

使用vue-router，暂不建议使用unplugin-vue-router（基于文件夹自动生成路由的开发时插件）

```
pnpm add vue-router@4
```

#### 4.10 src/store

使用pinia

```
pnpm add pinia
```

#### 4.11 src/views

说明：移除了创建文件时自动生成的 components文件夹。所有的vue组件根据使用层级都放到views下。

#### 4.12 src/utils

### 5 arco

复制arco-pro中的部分资源，并做如下设置。

#### 5.1 arco

package.json 添加依赖：

```
"dependencies": {
},
"devDependencies": {
    "@arco-design/web-vue": "^2.56.3",
    "@arco-plugins/vite-vue": "^1.4.5",
    "unplugin-auto-import": "^0.17.8",
    "unplugin-vue-components": "^0.26.0",
}
```

#### 5.2 arco插件：

```ts
import Components from "unplugin-vue-components/vite"
import { ArcoResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import { vitePluginForArco } from "@arco-plugins/vite-vue"

plugins: [
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
]
```

编码规范说明：除了vue、arco之外的组件，都需要在代码中用import语句明确引入，包括校常见的pinia、vue router等也不使用自动引入。

#### 5.3 arco css

arco使用了less来书写css，结合 src/assets中的文件，在vite.config.ts中设置：

```ts
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
```

### 6 把hello-arco作为模板使用

1. 复制整个文件夹，如复制到 /my-project

2. 然后修改package.json:

   ```
     "name": "my-project", <- 修改项目名称
     "version": "1.0.0",  <- 修改项目版本
   ```

3. 修改Logo，flash页面图像等资源。

