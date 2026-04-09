<script setup lang="ts">
import FieldCard from './FieldCard.vue'
import StepsEditor from './StepsEditor.vue'
import { FIELD_DEFINITIONS } from '../data/fields'
import type { BuilderState } from '../types/risen'

const props = defineProps<{
  state: BuilderState
}>()

const emit = defineEmits<{
  update: [state: BuilderState]
}>()

const updateField = (key: 'role' | 'instructions', value: string) => {
  emit('update', { ...props.state, [key]: value })
}

const updateClassicField = (key: 'endGoal' | 'narrowing', value: string) => {
  emit('update', {
    ...props.state,
    [key]: value,
  })
}

const updateSteps = (steps: string[]) => {
  emit('update', {
    ...props.state,
    steps,
  })
}
</script>

<template>
  <div class="space-y-4">
    <FieldCard :field="FIELD_DEFINITIONS[0]" :model-value="state.role" @update:model-value="updateField('role', $event)" />
    <FieldCard :field="FIELD_DEFINITIONS[1]" :model-value="state.instructions" @update:model-value="updateField('instructions', $event)" />
    <StepsEditor :helper="FIELD_DEFINITIONS[2].helper" :steps="state.steps" @update="updateSteps" />
    <FieldCard :field="FIELD_DEFINITIONS[3]" :model-value="state.endGoal" @update:model-value="updateClassicField('endGoal', $event)" />
    <FieldCard :field="FIELD_DEFINITIONS[4]" :model-value="state.narrowing" @update:model-value="updateClassicField('narrowing', $event)" />
  </div>
</template>
