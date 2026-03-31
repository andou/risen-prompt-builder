<script setup lang="ts">
import { EMPTY_PROMPT_MESSAGE, LETTER_ACCENTS } from '../data/constants'
import type { PromptSection } from '../types/risen'

defineProps<{
  sections: PromptSection[]
  assembledPrompt: string
  wordCount: number
  characterCount: number
}>()

const accentFor = (letter: PromptSection['letter']) => LETTER_ACCENTS[letter]
</script>

<template>
  <div class="panel-card flex h-full flex-col overflow-hidden">
    <div class="border-b border-[var(--border-subtle)] px-4 py-4 sm:px-5">
      <p class="eyebrow">Live Preview</p>
      <h2 class="mt-1 text-[18px] font-semibold tracking-tight text-[var(--text-strong)]">Ready to copy</h2>
    </div>

    <div class="min-h-[420px] flex-1 overflow-y-auto px-4 py-5 sm:px-5">
      <div v-if="sections.length" class="space-y-6">
        <section v-for="section in sections" :key="section.key" class="space-y-3">
          <h3 class="text-[14px] font-semibold tracking-tight" :style="{ color: accentFor(section.letter) }">## {{ section.title }}</h3>
          <pre class="whitespace-pre-wrap break-words font-[inherit] text-[14px] leading-7 text-[var(--text-body)]">{{ section.body }}</pre>
        </section>
      </div>

      <div v-else class="flex h-full min-h-[340px] items-center justify-center rounded-3xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-alt)] px-6 text-center text-[14px] leading-7 text-[var(--text-muted)]">
        {{ EMPTY_PROMPT_MESSAGE }}
      </div>
    </div>

    <div class="border-t border-[var(--border-subtle)] px-4 py-3 text-[12px] text-[var(--text-faint)] sm:px-5">
      {{ wordCount }} words · {{ characterCount }} characters
    </div>
  </div>
</template>
