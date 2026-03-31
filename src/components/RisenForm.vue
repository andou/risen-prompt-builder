<script setup lang="ts">
import { computed } from 'vue'
import FieldCard from './FieldCard.vue'
import StepsEditor from './StepsEditor.vue'
import ExamplesEditor from './ExamplesEditor.vue'
import { FIELD_DEFINITIONS } from '../data/fields'
import type { BuilderState, ExamplePair, RisenVariant } from '../types/risen'

const props = defineProps<{
  variant: RisenVariant
  state: BuilderState
}>()

const emit = defineEmits<{
  update: [state: BuilderState]
  updateExamples: [examples: ExamplePair[]]
}>()

const updateField = (key: 'role' | 'instruction', value: string) => {
  emit('update', { ...props.state, [key]: value })
}

const updateClassicField = (key: 'endGoal' | 'narrowing', value: string) => {
  emit('update', {
    ...props.state,
    classic: {
      ...props.state.classic,
      [key]: value,
    },
  })
}

const updateExtendedField = (key: 'structure' | 'nuance', value: string) => {
  emit('update', {
    ...props.state,
    extended: {
      ...props.state.extended,
      [key]: value,
    },
  })
}

const updateSteps = (steps: string[]) => {
  emit('update', {
    ...props.state,
    classic: {
      ...props.state.classic,
      steps,
    },
  })
}

const fields = computed(() => FIELD_DEFINITIONS[props.variant])
</script>

<template>
  <div class="space-y-4">
    <FieldCard :field="fields[0]" :model-value="state.role" @update:model-value="updateField('role', $event)" />
    <FieldCard :field="fields[1]" :model-value="state.instruction" @update:model-value="updateField('instruction', $event)" />

    <template v-if="variant === 'classic'">
      <StepsEditor :helper="fields[2].helper" :steps="state.classic.steps" @update="updateSteps" />
      <FieldCard :field="fields[3]" :model-value="state.classic.endGoal" @update:model-value="updateClassicField('endGoal', $event)" />
      <FieldCard :field="fields[4]" :model-value="state.classic.narrowing" @update:model-value="updateClassicField('narrowing', $event)" />
    </template>

    <template v-else>
      <FieldCard :field="fields[2]" :model-value="state.extended.structure" @update:model-value="updateExtendedField('structure', $event)" />
      <ExamplesEditor :helper="fields[3].helper" :examples="state.extended.examples" @update="emit('updateExamples', $event)" />
      <FieldCard :field="fields[4]" :model-value="state.extended.nuance" @update:model-value="updateExtendedField('nuance', $event)" />
    </template>
  </div>
</template>
