export type ThemeMode = 'light' | 'dark'

export interface BuilderState {
  role: string
  instructions: string
  steps: string[]
  endGoal: string
  narrowing: string
}

export interface SavedPrompt {
  id: string
  name: string
  state: BuilderState
  createdAt: string
  updatedAt: string
}

export interface StoragePayload {
  version: number
  state: BuilderState
  updatedAt: string
}

export interface FieldDefinition {
  key: 'role' | 'instructions' | 'steps' | 'endGoal' | 'narrowing'
  letter: 'R' | 'I' | 'S' | 'E' | 'N'
  title: string
  helper: string
  placeholder?: string
}

export interface TemplatePreset {
  id: string
  title: string
  description: string
  state: BuilderState
}

export interface PromptSection {
  key: string
  letter: 'R' | 'I' | 'S' | 'E' | 'N'
  title: string
  body: string
}
