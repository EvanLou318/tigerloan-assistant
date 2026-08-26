<template>
  <van-action-sheet
    v-model:show="visible"
    title="选择录入方式"
    description="AI 将自动提取产品信息，减少手动录入"
    :actions="methods"
    cancel-text="取消"
    close-on-click-action
    @select="onSelect"
  >
    <template #action="{ action }">
      <div class="method-option">
        <div class="method-icon" :style="{ background: action.bg }">
          <span v-html="action.svg"></span>
        </div>
        <div class="method-info">
          <div class="method-name">{{ action.name }}</div>
          <div class="method-desc">{{ action.desc }}</div>
        </div>
        <van-icon name="arrow" color="#94A3B8" />
      </div>
    </template>
  </van-action-sheet>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  show: { type: Boolean, default: false },
})
const emit = defineEmits(['update:show'])

const router = useRouter()
const visible = ref(false)

watch(
  () => props.show,
  (val) => {
    visible.value = val
  }
)
watch(visible, (val) => emit('update:show', val))

const methods = [
  {
    name: '文本录入',
    desc: '手动填写表单',
    method: 'text',
    bg: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.05))',
    svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 4V9H10V20H14V9H19V4H5Z" fill="#3B82F6"/></svg>',
  },
  {
    name: '语音录入',
    desc: '口述产品信息，AI 自动识别',
    method: 'voice',
    bg: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.05))',
    svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 14C13.1 14 14 13.1 14 12V6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6V12C10 13.1 10.9 14 12 14ZM17 12C17 14.8 14.8 17 12 17C9.2 17 7 14.8 7 12H5C5 15.3 7.4 18.1 10.5 18.8V22H13.5V18.8C16.6 18.1 19 15.3 19 12H17Z" fill="#06B6D4"/></svg>',
  },
  {
    name: '图片录入',
    desc: '上传产品海报/宣传单照片',
    method: 'image',
    bg: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.05))',
    svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.5L14.5 12L19 18H5L8.5 13.5Z" fill="#3B82F6"/></svg>',
  },
  {
    name: 'PDF录入',
    desc: '上传产品说明文档',
    method: 'pdf',
    bg: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.05))',
    svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM15 9V3.5L19.5 9H15Z" fill="#06B6D4"/></svg>',
  },
]

function onSelect(action) {
  visible.value = false
  router.push(`/products/create?method=${action.method}`)
}
</script>

<style scoped>
.method-option {
  display: flex;
  align-items: center;
  gap: 14px;
  text-align: left;
}

.method-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: none;
  background: var(--surface-container-low);
}

.method-info {
  flex: 1;
}

.method-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.method-desc {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 2px;
}
</style>
