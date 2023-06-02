import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        // 解决vue无法识别部分原生组件标签的问题，匹配的标签跳过组件解析
        compilerOptions: {
          isCustomElement: tag => tag.includes('footer')
        }
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'), 
    },
    extensions: ['.js', '.json', '.ts']
  },
  css: {
    preprocessorOptions: {
      // 引入 scss 全局变量
      scss: {
        prependData: "@use '@assets/css/globalVar.scss' as *;"
      }
    }
  }
})
