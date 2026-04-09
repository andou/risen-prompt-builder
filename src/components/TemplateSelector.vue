<script setup lang="ts">
import { ref } from 'vue'
import { TEMPLATE_PRESETS } from '../data/templates'
import type { TemplatePreset } from '../types/risen'

const emit = defineEmits<{
  apply: [template: TemplatePreset]
}>()

const isOpen = ref(false)
</script>

<template>
  <section class="panel-card p-4 sm:p-5">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="eyebrow">Template Library</p>
        <h2 class="mt-1 text-[18px] font-semibold tracking-tight text-[var(--text-strong)]">Start from real coding-agent workflows</h2>
        <p class="mt-1 max-w-2xl text-[14px] leading-6 text-[var(--text-muted)]">
          Use prefilled RISEN prompts for debugging, shipping features, refactoring code, expanding tests, and planning migrations.
        </p>
      </div>

      <button class="ghost-button" type="button" @click="isOpen = !isOpen">
        {{ isOpen ? 'Hide templates' : 'Browse templates' }}
      </button>
    </div>

    <transition name="fade-slide">
      <div v-if="isOpen" class="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <button
          v-for="template in TEMPLATE_PRESETS"
          :key="template.id"
          class="template-card text-left"
          type="button"
          @click="emit('apply', template)"
        >
          <span class="block text-[15px] font-semibold tracking-tight text-[var(--text-strong)]">{{ template.title }}</span>
          <span class="mt-2 block text-[13px] leading-5 text-[var(--text-muted)]">{{ template.description }}</span>
        </button>
      </div>
    </transition>
  </section>
</template>
