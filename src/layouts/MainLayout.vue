<template>
  <div class="layout-container">
    <div class="layout-content">
      <slot></slot>
    </div>
    <van-tabbar v-model="active" route safe-area-inset-bottom>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/products" icon="apps-o">产品</van-tabbar-item>
      <van-tabbar-item to="/customers" icon="friends-o">客户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
}

.layout-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 50px;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
