<script setup lang="ts">
import type { ThemeMode } from '../types/risen'

defineProps<{
  theme: ThemeMode
}>()

const emit = defineEmits<{
  toggleTheme: []
}>()
</script>

<template>
  <header class="panel-card sticky top-4 z-30 mb-6 flex flex-col gap-4 px-4 py-4 backdrop-blur sm:px-5 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <p class="eyebrow">Coding Agent Prompts</p>
      <h1 class="mt-1 text-[24px] font-semibold tracking-tight text-[var(--text-strong)]">RISEN Coding Agent Builder</h1>
    </div>

    <div class="flex flex-wrap items-center gap-3 self-end lg:self-auto">
      <button class="icon-button h-10 w-10 rounded-full" type="button" :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'" @click="emit('toggleTheme')">
        <span v-if="theme === 'dark'">☀</span>
        <span v-else>☾</span>
      </button>
    </div>
  </header>
</template>
