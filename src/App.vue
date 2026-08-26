<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </van-config-provider>
</template>

<script setup>
const themeVars = {
  // 浅色插画风：白底 + 蓝/青/紫主调
  primaryColor: '#3B82F6',
  successColor: '#10B981',
  dangerColor: '#EF4444',
  warningColor: '#F59E0B',
  background: '#F8FAFC',
  background2: '#FFFFFF',
  textColor: '#0F172A',
  textColor2: '#475569',
  textColor3: '#94A3B8',
  borderColor: '#E2E8F0',
  cellBackground: '#FFFFFF',
  cellTextColor: '#0F172A',
  navBarBackground: '#F8FAFC',
  navBarTitleTextColor: '#0F172A',
  navBarTextColor: '#0F172A',
  tabbarBackground: 'rgba(255,255,255,0.95)',
  tabbarItemActiveTextColor: '#3B82F6',
  buttonPrimaryBackground: '#3B82F6',
  buttonPrimaryBorderColor: '#3B82F6',
  buttonPrimaryTextColor: '#FFFFFF',
  fieldInputTextColor: '#0F172A',
  fieldPlaceholderTextColor: '#94A3B8',
  popupBackground: '#FFFFFF',
  actionSheetBackground: '#FFFFFF',
  searchBackground: 'transparent',
  tabActiveTextColor: '#3B82F6',
  tagPrimaryColor: '#3B82F6',
  switchOnBackground: '#3B82F6',
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
