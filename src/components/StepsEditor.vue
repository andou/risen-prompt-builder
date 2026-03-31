<script setup lang="ts">
const props = defineProps<{
  helper: string
  steps: string[]
}>()

const emit = defineEmits<{
  update: [steps: string[]]
}>()

const updateStep = (index: number, value: string) => {
  const next = [...props.steps]
  next[index] = value
  emit('update', next)
}

const addStep = () => {
  emit('update', [...props.steps, ''])
}

const removeStep = (index: number) => {
  if (props.steps.length === 1) {
    emit('update', [''])
    return
  }

  emit(
    'update',
    props.steps.filter((_, stepIndex) => stepIndex !== index),
  )
}

const moveStep = (index: number, direction: -1 | 1) => {
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= props.steps.length) {
    return
  }

  const next = [...props.steps]
  const [item] = next.splice(index, 1)
  next.splice(targetIndex, 0, item)
  emit('update', next)
}
</script>

<template>
  <section class="field-card" style="--field-accent: var(--accent-s)">
    <div class="mb-3">
      <div class="field-label text-sm font-semibold tracking-tight">
        <span class="field-letter">S</span>
        <span class="text-[var(--text-strong)]"> - Steps</span>
      </div>
      <p class="mt-1 text-[13px] leading-5 text-[var(--text-muted)]">{{ helper }}</p>
    </div>

    <div class="space-y-3">
      <div v-for="(step, index) in steps" :key="`${index}-${steps.length}`" class="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)] p-3">
        <div class="mb-2 flex items-center justify-between text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--text-faint)]">
          <span>Step {{ index + 1 }}</span>
          <div class="flex items-center gap-1">
            <button class="icon-button" type="button" @click="moveStep(index, -1)">↑</button>
            <button class="icon-button" type="button" @click="moveStep(index, 1)">↓</button>
            <button class="icon-button" type="button" @click="removeStep(index)">×</button>
          </div>
        </div>
        <input
          class="app-input"
          type="text"
          :value="step"
          :placeholder="`Describe step ${index + 1}`"
          @input="updateStep(index, ($event.target as HTMLInputElement).value)"
        />
      </div>

      <button class="ghost-button" type="button" @click="addStep">Add step</button>
    </div>
  </section>
</template>
