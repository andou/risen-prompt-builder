import type { BuilderState } from '../types/risen'

export const STORAGE_VERSION = 1
export const DRAFT_STORAGE_KEY = 'risen-builder:draft'
export const SAVED_PROMPTS_STORAGE_KEY = 'risen-builder:saved-prompts'
export const THEME_STORAGE_KEY = 'risen-builder:theme'

export const LETTER_ACCENTS = {
  R: 'var(--accent-r)',
  I: 'var(--accent-i)',
  S: 'var(--accent-s)',
  E: 'var(--accent-e)',
  N: 'var(--accent-n)',
} as const

export const EMPTY_PROMPT_MESSAGE =
  'Start filling in the fields to see your prompt come together.'

export const createDefaultState = (): BuilderState => ({
  role: '',
  instructions: '',
  steps: ['', ''],
  endGoal: '',
  narrowing: '',
})
