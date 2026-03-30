<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const isChapterPage = computed(() => /chapter_\d+/.test(route.path))

function navigate(direction: 'prev' | 'next') {
  const match = route.path.match(/chapter_(\d+)/)
  if (!match) return

  const currentNum = parseInt(match[1])
  if (direction === 'prev' && currentNum <= 1) return
  if (direction === 'next' && currentNum >= 1521) return

  const newNum = direction === 'prev' ? currentNum - 1 : currentNum + 1
  const numStr = String(newNum).padStart(4, '0')

  // Extract base path from current location
  const base = window.location.pathname.replace(/chapters\/chapter_\d+$/, '')
  window.location.href = base + 'chapter_' + numStr
}

function handleKeydown(e: KeyboardEvent) {
  if (!isChapterPage.value) return
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

  if (e.key === 'ArrowRight') {
    e.preventDefault()
    navigate('next')
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    navigate('prev')
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<template>
  <div v-if="isChapterPage" class="keyboard-hint">
    <span class="hint-item" @click="navigate('prev')">
      <kbd>←</kbd> 上一章
    </span>
    <span class="hint-item" @click="navigate('next')">
      <kbd>→</kbd> 下一章
    </span>
  </div>
</template>

<style scoped>
.keyboard-hint {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: var(--vp-c-bg-soft);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  opacity: 0.7;
  transition: opacity 0.2s;
  display: flex;
  gap: 1rem;
}

.keyboard-hint:hover {
  opacity: 1;
}

.hint-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.hint-item:hover {
  color: var(--vp-c-brand-1);
}

.keyboard-hint kbd {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
  font-family: inherit;
  font-size: 0.8rem;
}
</style>
