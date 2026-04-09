<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SavedPrompt } from '../types/risen'

const props = defineProps<{
  assembledPrompt: string
  savedPrompts: SavedPrompt[]
}>()

const emit = defineEmits<{
  copy: []
  clear: []
  save: [name: string]
  load: [prompt: SavedPrompt]
  delete: [id: string]
  download: []
}>()

const isConfirmingClear = ref(false)
const isSaving = ref(false)
const isLoading = ref(false)
const saveName = ref('')

const canSave = computed(() => props.assembledPrompt.trim().length > 0)

const submitSave = () => {
  const trimmed = saveName.value.trim()
  if (!trimmed) {
    return
  }

  emit('save', trimmed)
  saveName.value = ''
  isSaving.value = false
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
</script>

<template>
  <div class="border-t border-[var(--border-subtle)] bg-[var(--surface)]/95 px-4 py-4 backdrop-blur sm:px-5">
    <div class="flex flex-wrap items-center gap-2">
      <button class="primary-button" type="button" :disabled="!assembledPrompt" @click="emit('copy')">Copy to clipboard</button>
      <button class="ghost-button" type="button" :disabled="!assembledPrompt" @click="emit('download')">Download .md</button>
      <button class="ghost-button" type="button" :disabled="!canSave" @click="isSaving = !isSaving">Save prompt</button>
      <button class="ghost-button" type="button" :disabled="!savedPrompts.length" @click="isLoading = !isLoading">Load prompt</button>

      <template v-if="!isConfirmingClear">
        <button class="ghost-button text-[var(--danger)]" type="button" :disabled="!assembledPrompt" @click="isConfirmingClear = true">Clear all</button>
      </template>
      <template v-else>
        <span class="text-[13px] text-[var(--text-muted)]">Are you sure?</span>
        <button class="ghost-button" type="button" @click="emit('clear'); isConfirmingClear = false">Confirm</button>
        <button class="ghost-button" type="button" @click="isConfirmingClear = false">Cancel</button>
      </template>
    </div>

    <transition name="fade-slide">
      <div v-if="isSaving" class="mt-3 flex flex-col gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)] p-3 sm:flex-row">
        <input v-model="saveName" class="app-input flex-1" type="text" placeholder="Name this prompt" @keydown.enter.prevent="submitSave" />
        <button class="primary-button" type="button" @click="submitSave">Save</button>
      </div>
    </transition>

    <transition name="fade-slide">
      <div v-if="isLoading" class="mt-3 space-y-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)] p-3">
        <div v-for="item in savedPrompts" :key="item.id" class="flex flex-col gap-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[14px] font-semibold text-[var(--text-strong)]">{{ item.name }}</span>
            </div>
            <p class="mt-1 text-[12px] text-[var(--text-faint)]">Updated {{ formatDate(item.updatedAt) }}</p>
          </div>

          <div class="flex items-center gap-2">
            <button class="ghost-button" type="button" @click="emit('load', item); isLoading = false">Load</button>
            <button class="ghost-button text-[var(--danger)]" type="button" @click="emit('delete', item.id)">Delete</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
