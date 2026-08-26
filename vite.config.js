import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver({ importStyle: false })],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  // 预构建全部直接依赖：启动时一次性完成，避免运行时发现新依赖
  // 触发 re-optimize 清理 deps_temp 目录（会被 WorkBuddy 批量删除保护拦截导致崩溃）
  // importStyle: false + main.js 全量引入 vant/lib/index.css，避免按需样式子路径触发新依赖发现
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'vant'],
  },
  base: './',
})
