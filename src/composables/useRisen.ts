import { computed, reactive } from 'vue'
import { createDefaultState } from '../data/constants'
import type { BuilderState, PromptSection, TemplatePreset } from '../types/risen'

export const useRisen = () => {
  const state = reactive<BuilderState>(createDefaultState())

  const updateState = (nextState: BuilderState) => {
    state.role = nextState.role
    state.instructions = nextState.instructions
    state.steps = [...nextState.steps]
    state.endGoal = nextState.endGoal
    state.narrowing = nextState.narrowing
  }

  const clearAll = () => {
    updateState(createDefaultState())
  }

  const applyTemplate = (template: TemplatePreset) => {
    updateState(template.state)
  }

  const hydrate = (nextState: BuilderState) => {
    updateState(nextState)
  }

  const previewSections = computed<PromptSection[]>(() => {
    const sections: PromptSection[] = []

    if (state.role.trim()) {
      sections.push({ key: 'role', letter: 'R', title: 'Role', body: state.role.trim() })
    }

    if (state.instructions.trim()) {
      sections.push({
        key: 'instructions',
        letter: 'I',
        title: 'Instructions',
        body: state.instructions.trim(),
      })
    }

    const steps = state.steps.map((step) => step.trim()).filter(Boolean)
    if (steps.length) {
      sections.push({
        key: 'steps',
        letter: 'S',
        title: 'Steps',
        body: steps.map((step, index) => `${index + 1}. ${step}`).join('\n'),
      })
    }

    if (state.endGoal.trim()) {
      sections.push({ key: 'end-goal', letter: 'E', title: 'End Goal', body: state.endGoal.trim() })
    }

    if (state.narrowing.trim()) {
      sections.push({ key: 'narrowing', letter: 'N', title: 'Narrowing', body: state.narrowing.trim() })
    }

    return sections
  })

  const assembledPrompt = computed(() =>
    previewSections.value.map((section) => `## ${section.title}\n${section.body}`).join('\n\n'),
  )

  const wordCount = computed(() => {
    const normalized = assembledPrompt.value.trim()
    return normalized ? normalized.split(/\s+/).length : 0
  })

  const characterCount = computed(() => assembledPrompt.value.length)

  return {
    state,
    previewSections,
    assembledPrompt,
    wordCount,
    characterCount,
    clearAll,
    applyTemplate,
    hydrate,
  }
}
