import { ref } from 'vue'
import {
  DRAFT_STORAGE_KEY,
  SAVED_PROMPTS_STORAGE_KEY,
  STORAGE_VERSION,
} from '../data/constants'
import type { BuilderState, RisenVariant, SavedPrompt, StoragePayload } from '../types/risen'

const cloneState = (state: BuilderState): BuilderState => structuredClone(state)

const parseJSON = <T>(value: string | null): T | null => {
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export const useStorage = () => {
  const savedPrompts = ref<SavedPrompt[]>(
    parseJSON<SavedPrompt[]>(window.localStorage.getItem(SAVED_PROMPTS_STORAGE_KEY)) ?? [],
  )

  const persistSavedPrompts = () => {
    window.localStorage.setItem(SAVED_PROMPTS_STORAGE_KEY, JSON.stringify(savedPrompts.value))
  }

  const saveDraft = (variant: RisenVariant, state: BuilderState) => {
    const payload: StoragePayload = {
      version: STORAGE_VERSION,
      variant,
      state: cloneState(state),
      updatedAt: new Date().toISOString(),
    }

    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload))
  }

  const loadDraft = () => {
    const payload = parseJSON<StoragePayload>(window.localStorage.getItem(DRAFT_STORAGE_KEY))

    if (!payload || payload.version !== STORAGE_VERSION) {
      return null
    }

    return payload
  }

  const savePrompt = (name: string, variant: RisenVariant, state: BuilderState) => {
    const now = new Date().toISOString()
    const prompt: SavedPrompt = {
      id: crypto.randomUUID(),
      name,
      variant,
      state: cloneState(state),
      createdAt: now,
      updatedAt: now,
    }

    savedPrompts.value = [prompt, ...savedPrompts.value]
    persistSavedPrompts()
    return prompt
  }

  const deletePrompt = (id: string) => {
    savedPrompts.value = savedPrompts.value.filter((item) => item.id !== id)
    persistSavedPrompts()
  }

  return {
    savedPrompts,
    saveDraft,
    loadDraft,
    savePrompt,
    deletePrompt,
  }
}
