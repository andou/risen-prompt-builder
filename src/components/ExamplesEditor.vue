<script setup lang="ts">
import type { ExamplePair } from '../types/risen'

const props = defineProps<{
  helper: string
  examples: ExamplePair[]
}>()

const emit = defineEmits<{
  update: [examples: ExamplePair[]]
}>()

const updateExample = (id: string, key: 'input' | 'output', value: string) => {
  emit(
    'update',
    props.examples.map((example) => (example.id === id ? { ...example, [key]: value } : example)),
  )
}

const addExample = () => {
  emit('update', [...props.examples, { id: crypto.randomUUID(), input: '', output: '' }])
}

const removeExample = (id: string) => {
  if (props.examples.length === 1) {
    emit('update', [{ id: crypto.randomUUID(), input: '', output: '' }])
    return
  }

  emit(
    'update',
    props.examples.filter((example) => example.id !== id),
  )
}
</script>

<template>
  <section class="field-card" style="--field-accent: var(--accent-e)">
    <div class="mb-3">
      <div class="field-label text-sm font-semibold tracking-tight">
        <span class="field-letter">E</span>
        <span class="text-[var(--text-strong)]"> - Examples</span>
      </div>
      <p class="mt-1 text-[13px] leading-5 text-[var(--text-muted)]">{{ helper }}</p>
    </div>

    <div class="space-y-3">
      <article v-for="(example, index) in examples" :key="example.id" class="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)] p-3">
        <div class="mb-3 flex items-center justify-between text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--text-faint)]">
          <span>Example {{ index + 1 }}</span>
          <button class="icon-button" type="button" @click="removeExample(example.id)">×</button>
        </div>

        <div class="space-y-3">
          <label class="block text-[13px] text-[var(--text-muted)]">
            <span class="mb-2 block font-medium text-[var(--text-strong)]">Input</span>
            <textarea
              class="app-textarea min-h-[90px]"
              :value="example.input"
              placeholder="Paste the input or scenario you want the AI to learn from."
              rows="3"
              @input="updateExample(example.id, 'input', ($event.target as HTMLTextAreaElement).value)"
            />
          </label>

          <label class="block text-[13px] text-[var(--text-muted)]">
            <span class="mb-2 block font-medium text-[var(--text-strong)]">Output</span>
            <textarea
              class="app-textarea min-h-[90px]"
              :value="example.output"
              placeholder="Show the style, structure, or quality level you expect back."
              rows="3"
              @input="updateExample(example.id, 'output', ($event.target as HTMLTextAreaElement).value)"
            />
          </label>
        </div>
      </article>

      <button class="ghost-button" type="button" @click="addExample">Add example</button>
    </div>
  </section>
</template>
