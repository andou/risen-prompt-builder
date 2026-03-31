<script setup lang="ts">
import { computed, useId } from 'vue'
import type { FieldDefinition } from '../types/risen'
import { LETTER_ACCENTS } from '../data/constants'

const props = defineProps<{
  field: FieldDefinition
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaId = useId()

const accentStyle = computed(() => ({
  '--field-accent': LETTER_ACCENTS[props.field.letter],
}))

const resizeTextarea = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  target.style.height = '0px'
  target.style.height = `${target.scrollHeight}px`
  emit('update:modelValue', target.value)
}
</script>

<template>
  <section class="field-card" :style="accentStyle">
    <label :for="textareaId" class="mb-3 block">
      <div class="field-label text-sm font-semibold tracking-tight">
        <span class="field-letter">{{ field.letter }}</span>
        <span class="text-[var(--text-strong)]"> - {{ field.title }}</span>
      </div>
      <p class="mt-1 text-[13px] leading-5 text-[var(--text-muted)]">{{ field.helper }}</p>
    </label>

    <textarea
      :id="textareaId"
      class="app-textarea min-h-[124px]"
      :value="modelValue"
      :placeholder="field.placeholder"
      rows="4"
      @input="resizeTextarea"
    />
  </section>
</template>
