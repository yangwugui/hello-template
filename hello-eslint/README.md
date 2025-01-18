# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## 1  pnpm create vite

创建 vite vue typescript 项目

## 2 eslint

### 2.1 pnpm create @eslint/config@latest

官网的eslint初始化工具，https://eslint.org/docs/latest/use/getting-started

```
PS D:\dev\yangwugui\hello-template\hello-eslint> pnpm create @eslint/config@latest
.../19476e6d32b-7728                     |  +11 +
.../19476e6d32b-7728                     | Progress: resolved 11, reused 10, downloaded 1, added 11, done
@eslint/create-config: v1.4.0

√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · typescript
√ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-vue
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · pnpm
```

生成的配置文件 **eslint.config.js** 如下：

```js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
];
```



### 2.2 VS Code ESLint extension

可以在vscode 中搜索 eslint 插件并安装：

```
ESLint 
Integrates ESLint JavaScript into VS Code.
Microsoft microsoft.com download：40,243,619
```

插件官网：https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

### 2.3 验证

建立 /src/try.js文件，输入代码即可看到代码提示。

```
/* eslint quotes: ["error", "double"] */
const a = 'a'
```

将会出现两个下划线，鼠标移动到上面将会有 eslint 提示：一是变量未使用，二是字符串要用双引号。

## 3 集成prettier

### 3.1 prettier

https://prettier.io/docs/en/install

```
pnpm add --save-dev --save-exact prettier
```

设置prettier的规则，.prettierrc文件：

```
{
  "semi": false,
  "trailingComma": "all",
  "printWidth": 100
}
```

说明：

对于prettier的选项，建议仅仅设置以下两个选项，其他全部使用默认值：
1. 代码打印行的长度从默认的 80 改成 100。如果兼顾纸介质那么80可能是最好的选择，但是对于以屏幕为主的场景，结合各种屏幕的分辨率和IDE的一般布局，设置为100效果更好。
2. 取消语句结尾的强制分号。取消语句结尾不必要的分号，能让程序员准确掌握js中编译器的“no LineTerminator here” 规则，不让程序员产生我没打分号所以就是一个语句的错误。

特别说明的是一下两个值采用默认值：

1. 缩进为2个字符。能让源更代码紧凑，目前大量的ide往往有折叠展开线，2个空格就够了。
2. 字符串是双引号，不是单引号。主要是考虑到和其他众多的编码语句一致。

### 3.2 eslint-config-prettier

https://github.com/prettier/eslint-config-prettier

需要禁用eslint中和prettier冲突的格式化规则。先安装然后设置 eslint-config-prettier。

```
pnpm add --save-dev eslint-config-prettier
```

Import eslint-config-prettier, and put it in the configuration array – **after** other configs that you want to override.

```
// ... import someConfig from "some-other-config-you-use";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // ... someConfig ...,
  eslintConfigPrettier,
];
```

eslint-config-prettier not only turns off *core* rules, but also some from these plugins automatically:

- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)
- [@babel/eslint-plugin](https://github.com/babel/babel/tree/main/eslint/babel-eslint-plugin)
- [eslint-plugin-babel](https://github.com/babel/eslint-plugin-babel)
- [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
- [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard)
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

### 3.3 eslint-plugin-prettier

https://github.com/prettier/eslint-plugin-prettier

在eslint的配置中设置代码格式化规则。

```
pnpm install --save-dev eslint-plugin-prettier
```

设置推荐规则：

```
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default [
  // Any other config imports go at the top
  eslintPluginPrettierRecommended,
];
```

### 3.4 验证

```
function a() {
    return 1;
}

/* eslint quotes: ["error", "double"] */
const a = 'a';

（空行）
（空行）
```

return前的4个空格，末尾的多余空行都会显示波浪线的格式错误提示。

## 4 prettier和vscode集成

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

Prettier - Code formatter，Code formatter using prettier

Prettier prettier.io download：53,096,185

```
pnpm add --save-dev --save-exact prettier
```

安装后，在源码的右键菜单中可以选择格式命令。

