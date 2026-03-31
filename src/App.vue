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
  instruction: nextState.instruction,
  classic: {
    steps: [...nextState.classic.steps],
    endGoal: nextState.classic.endGoal,
    narrowing: nextState.classic.narrowing,
  },
  extended: {
    structure: nextState.extended.structure,
    examples: nextState.extended.examples.map((example) => ({ ...example })),
    nuance: nextState.extended.nuance,
  },
})

const { theme, toggleTheme } = useTheme()
const {
  variant,
  state,
  switchNotice,
  previewSections,
  assembledPrompt,
  wordCount,
  characterCount,
  setVariant,
  clearAll,
  applyTemplate,
  hydrate,
  updateExamples,
} = useRisen()

const { savedPrompts, saveDraft, loadDraft, savePrompt, deletePrompt } = useStorage()

const copyState = ref<'idle' | 'copied'>('idle')
const mobilePanel = ref<'form' | 'preview'>('form')

const replaceState = (nextState: BuilderState) => {
  state.role = nextState.role
  state.instruction = nextState.instruction
  state.classic = {
    steps: [...nextState.classic.steps],
    endGoal: nextState.classic.endGoal,
    narrowing: nextState.classic.narrowing,
  }
  state.extended = {
    structure: nextState.extended.structure,
    examples: nextState.extended.examples.map((example) => ({ ...example })),
    nuance: nextState.extended.nuance,
  }
}

onMounted(() => {
  const draft = loadDraft()
  if (draft) {
    hydrate(draft.variant, draft.state)
  }
})

watch(
  [variant, () => state],
  ([nextVariant]) => {
    saveDraft(nextVariant, cloneState(state))
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
  savePrompt(name, variant.value, cloneState(state))
}

const onLoad = (prompt: SavedPrompt) => {
  hydrate(prompt.variant, prompt.state)
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
  link.download = `risen-prompt-${variant.value}.md`
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
      <AppHeader :variant="variant" :theme="theme" @update:variant="setVariant" @toggle-theme="toggleTheme" />

      <TemplateSelector @apply="applySelectedTemplate" />

      <transition name="fade-slide">
        <p v-if="switchNotice" class="mt-4 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-alt)] px-4 py-3 text-[13px] text-[var(--text-muted)]">
          {{ switchNotice }}
        </p>
      </transition>

      <div class="mt-5 flex rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-1 lg:hidden">
        <button class="segment-button flex-1" :class="mobilePanel === 'form' ? 'segment-button-active' : ''" type="button" @click="mobilePanel = 'form'">Builder</button>
        <button class="segment-button flex-1" :class="mobilePanel === 'preview' ? 'segment-button-active' : ''" type="button" @click="mobilePanel = 'preview'">Preview</button>
      </div>

      <main class="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)]">
        <section :class="mobilePanel === 'preview' ? 'hidden lg:block' : 'block'" class="space-y-4">
          <div class="panel-card px-4 py-4 sm:px-5">
            <p class="eyebrow">Form</p>
            <h2 class="mt-1 text-[18px] font-semibold tracking-tight text-[var(--text-strong)]">Shape your prompt</h2>
            <p class="mt-1 text-[14px] leading-6 text-[var(--text-muted)]">
              Build a {{ variant }} RISEN prompt with clean sections, useful examples, and client-side autosave.
            </p>
          </div>

          <RisenForm :variant="variant" :state="state" @update="updateState" @update-examples="updateExamples" />
        </section>

        <section :class="mobilePanel === 'form' ? 'hidden lg:flex' : 'flex'" class="min-h-[680px] flex-col rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)]">
          <PromptPreview :sections="previewSections" :assembled-prompt="assembledPrompt" :word-count="wordCount" :character-count="characterCount" />
          <ActionBar
            :assembled-prompt="assembledPrompt"
            :variant="variant"
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
