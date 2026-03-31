export type RisenVariant = 'classic' | 'extended'

export type ThemeMode = 'light' | 'dark'

export interface ExamplePair {
  id: string
  input: string
  output: string
}

export interface BuilderState {
  role: string
  instruction: string
  classic: {
    steps: string[]
    endGoal: string
    narrowing: string
  }
  extended: {
    structure: string
    examples: ExamplePair[]
    nuance: string
  }
}

export interface SavedPrompt {
  id: string
  name: string
  variant: RisenVariant
  state: BuilderState
  createdAt: string
  updatedAt: string
}

export interface StoragePayload {
  version: number
  variant: RisenVariant
  state: BuilderState
  updatedAt: string
}

export interface FieldDefinition {
  key: 'role' | 'instruction' | 'steps' | 'endGoal' | 'narrowing' | 'structure' | 'examples' | 'nuance'
  letter: 'R' | 'I' | 'S' | 'E' | 'N'
  title: string
  helper: string
  placeholder?: string
}

export interface TemplatePreset {
  id: string
  title: string
  description: string
  variants: Record<RisenVariant, { state: BuilderState }>
}

export interface PromptSection {
  key: string
  letter: 'R' | 'I' | 'S' | 'E' | 'N'
  title: string
  body: string
}
