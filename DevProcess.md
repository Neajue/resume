# 开发过程文档

> client：前端项目
> server：后端项目

## 前端

### 环境搭建

技术选型：HTML5 + sass + TypeScript + Vue3 + vue-router + vite + pinia + axios + element-plus + tailwindcss

1. 先创建好远程仓库https://github.com/Neajue/resume.git，然后关联远程仓库。
  ```bash
  git init
  git remote add origin https://github.com/Neajue/resume.git 
  git pull origin main
  ```
2. 前端部分使用vite脚手架搭建vue3+ts项目，项目名为client
  ```bash
  npm create vite@latest
  cd client
  npm install
  npm run dev
  ```
3. 配置 src 绝对路径为 @
  ```bash
  npm i @types/node -D
  ```
  ```js
  // vite.config.js
  import { resolve } from 'path'
  export default defineConfig({
    resolve: {
      alias: {
        "@": resolve(__dirname, 'src'), 
      },
      extensions: ['.js', '.json', '.ts']
    },
  })
  ```
  ```json
  // tsconfig.json
  {
    "compilerOptions" : {
      "baseUrl": ".",
      "paths": {
          "@/*": ["src/*"]
      }
    }
  }
  ```
4. 安装开发依赖
  ```bash
  npm install vue-router@4
  npm install pinia
  npm install pinia-persistedstate-plugin
  npm install axios
  npm install qs
  npm install element-plus
  npm install @element-plus/icons-vue
  npm i unplugin-auto-import -D
  npm i vite-plugin-vue-setup-extend -D
  npm add -D sass 
  ```
  - 配置 tailwindcss
    ```
    npm install postcss
    npm install autoprefixer
    npm install -D tailwindcss
    npx tailwindcss init -p
    ```
    ```js
    // 在 tailwind.config.js 中配置 tailwindcss
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    ```
    ```css
    /* 新建assets/css/tailwind.css ，引用tailwind中的资源*/
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    ```js
    // main.ts中引入tailwind.css
    import './assets/css/tailwind.css'
    ```
    ```bash
    # 开启 Tailwind CLI 构建流程
    npx tailwindcss -i ./src/assets/css/tailwind.css -o ./dist/output.css --watch
    ```
  - element-plus 组件自动导入配置
    ```bash
    npm install -D unplugin-vue-components unplugin-auto-import
    ```
    ```js
    // vite.config.ts
    import AutoImport from 'unplugin-auto-import/vite'
    import Components from 'unplugin-vue-components/vite'
    import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
    export default defineConfig({
      plugins: [
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ],
    })
    ```
  - 配置 vue-router
    创建 src/router/index.ts
    ```js
    // src/router/index.ts
    import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
    const routes: Array<RouteRecordRaw> = [{}]
    const router = createRouter({
      history: createWebHistory(), 
      routes
    })
    export default router
    ```
    ```js
    // main.ts
    import router from './router'
    app.use(router);
    ```
    ```vue
    <!-- APP.vue 中配置路由入口 -->
    <template>
      <div>
        <router-view></router-view>
      </div>
    </template>
    ```
  - 配置 pinia
    新建 src/store 文件夹，在其中新建 index.ts 和 user.ts
    ```js
    // store/index.ts
    import { createPinia } from "pinia"
    import { createPersistedState } from 'pinia-persistedstate-plugin'
    const pinia = createPinia();
    pinia.use(createPersistedState());
    export default pinia;
    ```
    ```js
    // main.ts
    import pinia from './store'
    app.use(pinia);
    ```
    ```js
    // store/user.ts
    import { defineStore } from 'pinia'
    const userStore = defineStore('user', {
      state: () => ({}),
      getters: {},
      actions: {}
    })
    export default userStore;
    ```
    ```js
    // 在需要使用的文件中局部引入
    import pinia from '@/store'
    import userStore from '@/store/user'
    const useUserStore = userStore(pinia);
    console.log(useUserStore)
    ```
  - 配置 axios
  创建 utils/api 文件夹，在文件夹中创建 axios.ts（请求配置文件），并对其进行配置
  创建 utils/types/index.d.ts，在其中声明 `declare module 'qs'`
  创建 .env.development 和 .env.production 来配置 url 环境
  ```js
  // 封装接口（在axios.ts同级目录下）
  import axios from './axios'
  export const 方法名: any = (data: any) => {
    return axios.post('url', data);
  }
  ```
5. 创建并切换到 dev 分支
  ```bash
  git branch -c dev
  ```

## 后端