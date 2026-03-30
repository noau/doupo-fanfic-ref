<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vitepress'

const router = useRouter()
const route = useRoute()

const isChapterPage = computed(() => /chapter_\d+/.test(route.path))

function getNextChapterLink(): string | null {
  const match = route.path.match(/chapter_(\d+)/)
  if (!match) return null

  const currentNum = parseInt(match[1])
  if (currentNum > 1521) return null

  const nextNum = String(currentNum + 1).padStart(4, '0')
  return `/doupo-fanfic-ref/chapters/chapter_${nextNum}`
}

function getPrevChapterLink(): string | null {
  const match = route.path.match(/chapter_(\d+)/)
  if (!match) return null

  const currentNum = parseInt(match[1])
  if (currentNum <= 1) return null

  const prevNum = String(currentNum - 1).padStart(4, '0')
  return `/doupo-fanfic-ref/chapters/chapter_${prevNum}`
}

function handleKeydown(e: KeyboardEvent) {
  if (!isChapterPage.value) return
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

  if (e.key === 'ArrowRight') {
    const nextLink = getNextChapterLink()
    if (nextLink) {
      e.preventDefault()
      router.go(nextLink)
    }
  } else if (e.key === 'ArrowLeft') {
    const prevLink = getPrevChapterLink()
    if (prevLink) {
      e.preventDefault()
      router.go(prevLink)
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<template>
  <div v-if="isChapterPage" class="keyboard-hint">
    <span class="hint-item" @click="router.go(getPrevChapterLink() || '/')">
      <kbd>←</kbd> 上一章
    </span>
    <span class="hint-item" @click="router.go(getNextChapterLink() || '/')">
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