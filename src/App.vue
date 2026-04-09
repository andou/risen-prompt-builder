<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import ActionBar from './components/ActionBar.vue'
import PromptPreview from './components/PromptPreview.vue'
import RisenForm from './components/RisenForm.vue'
import TemplateSelector from './components/TemplateSelector.vue'
import { useRisen } from './composables/useRisen'
import { useStorage } from './composables/useStorage'
import { useTheme } from './composables/useTheme'
import type { BuilderState, SavedPrompt, TemplatePreset } from './types/risen'

const cloneState = (nextState: BuilderState): BuilderState => ({
  role: nextState.role,
  instructions: nextState.instructions,
  steps: [...nextState.steps],
  endGoal: nextState.endGoal,
  narrowing: nextState.narrowing,
})

const { theme, toggleTheme } = useTheme()
const {
  state,
  previewSections,
  assembledPrompt,
  wordCount,
  characterCount,
  clearAll,
  applyTemplate,
  hydrate,
} = useRisen()

const { savedPrompts, saveDraft, loadDraft, savePrompt, deletePrompt } = useStorage()

const copyState = ref<'idle' | 'copied'>('idle')
const mobilePanel = ref<'form' | 'preview'>('form')

const replaceState = (nextState: BuilderState) => {
  state.role = nextState.role
  state.instructions = nextState.instructions
  state.steps = [...nextState.steps]
  state.endGoal = nextState.endGoal
  state.narrowing = nextState.narrowing
}

onMounted(() => {
  const draft = loadDraft()
  if (draft) {
    hydrate(draft.state)
  }
})

watch(
  () => state,
  () => {
    saveDraft(cloneState(state))
  },
  { deep: true },
)

const updateState = (nextState: BuilderState) => {
  replaceState(nextState)
}

const onCopy = async () => {
  if (!assembledPrompt.value) {
    return
  }

  await navigator.clipboard.writeText(assembledPrompt.value)
  copyState.value = 'copied'
  window.setTimeout(() => {
    copyState.value = 'idle'
  }, 1800)
}

const onSave = (name: string) => {
  savePrompt(name, cloneState(state))
}

const onLoad = (prompt: SavedPrompt) => {
  hydrate(prompt.state)
  mobilePanel.value = 'form'
}

const onDownload = () => {
  if (!assembledPrompt.value) {
    return
  }

  const file = new Blob([assembledPrompt.value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = 'risen-prompt-classic.md'
  link.click()
  URL.revokeObjectURL(url)
}

const copyLabel = computed(() => (copyState.value === 'copied' ? 'Copied!' : 'Copy to clipboard'))

const applySelectedTemplate = (template: TemplatePreset) => {
  applyTemplate(template)
  mobilePanel.value = 'form'
}
</script>

<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--text-body)] transition-colors duration-300">
    <div class="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8">
      <AppHeader :theme="theme" @toggle-theme="toggleTheme" />

      <TemplateSelector @apply="applySelectedTemplate" />

      <div class="mt-5 flex rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-1 lg:hidden">
        <button class="segment-button flex-1" :class="mobilePanel === 'form' ? 'segment-button-active' : ''" type="button" @click="mobilePanel = 'form'">Builder</button>
        <button class="segment-button flex-1" :class="mobilePanel === 'preview' ? 'segment-button-active' : ''" type="button" @click="mobilePanel = 'preview'">Preview</button>
      </div>

      <main class="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)]">
        <section :class="mobilePanel === 'preview' ? 'hidden lg:block' : 'block'" class="space-y-4">
          <div class="panel-card px-4 py-4 sm:px-5">
            <p class="eyebrow">Form</p>
            <h2 class="mt-1 text-[18px] font-semibold tracking-tight text-[var(--text-strong)]">Shape your coding-agent prompt</h2>
            <p class="mt-1 text-[14px] leading-6 text-[var(--text-muted)]">
              Build a RISEN prompt for coding agents with practical templates, clean sections, and client-side autosave.
            </p>
          </div>

          <RisenForm :state="state" @update="updateState" />
        </section>

        <section :class="mobilePanel === 'form' ? 'hidden lg:flex' : 'flex'" class="min-h-[680px] flex-col rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)]">
          <PromptPreview :sections="previewSections" :assembled-prompt="assembledPrompt" :word-count="wordCount" :character-count="characterCount" />
          <ActionBar
            :assembled-prompt="assembledPrompt"
            :saved-prompts="savedPrompts"
            @copy="onCopy"
            @clear="clearAll"
            @save="onSave"
            @load="onLoad"
            @delete="deletePrompt"
            @download="onDownload"
          />
          <p class="px-4 pb-4 text-[12px] text-[var(--text-faint)] sm:px-5">{{ copyLabel }}</p>
        </section>
      </main>

      <AppFooter />
    </div>
  </div>
</template>
