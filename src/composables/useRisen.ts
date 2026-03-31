import { computed, reactive, ref } from 'vue'
import { createDefaultState } from '../data/constants'
import type { BuilderState, ExamplePair, PromptSection, RisenVariant, TemplatePreset } from '../types/risen'

const emptyClassic = (): BuilderState['classic'] => createDefaultState().classic
const emptyExtended = (): BuilderState['extended'] => createDefaultState().extended

export const useRisen = () => {
  const variant = ref<RisenVariant>('classic')
  const state = reactive<BuilderState>(createDefaultState())
  const switchNotice = ref('')

  const updateState = (nextState: BuilderState) => {
    state.role = nextState.role
    state.instruction = nextState.instruction
    state.classic = structuredClone(nextState.classic)
    state.extended = structuredClone(nextState.extended)
  }

  const resetCurrentVariantFields = (nextVariant: RisenVariant) => {
    if (nextVariant === 'classic') {
      state.classic = emptyClassic()
    } else {
      state.extended = emptyExtended()
    }
  }

  const setVariant = (nextVariant: RisenVariant) => {
    if (variant.value === nextVariant) {
      return
    }

    variant.value = nextVariant
    resetCurrentVariantFields(nextVariant)
    switchNotice.value = 'Some fields were reset to match the new variant.'
    window.setTimeout(() => {
      switchNotice.value = ''
    }, 2400)
  }

  const clearAll = () => {
    updateState(createDefaultState())
  }

  const applyTemplate = (template: TemplatePreset) => {
    const nextState = template.variants[variant.value].state
    updateState(nextState)
  }

  const hydrate = (nextVariant: RisenVariant, nextState: BuilderState) => {
    variant.value = nextVariant
    updateState(nextState)
  }

  const previewSections = computed<PromptSection[]>(() => {
    const sections: PromptSection[] = []

    if (state.role.trim()) {
      sections.push({ key: 'role', letter: 'R', title: 'Role', body: state.role.trim() })
    }

    if (state.instruction.trim()) {
      sections.push({
        key: 'instruction',
        letter: 'I',
        title: variant.value === 'classic' ? 'Instructions' : 'Instruction',
        body: state.instruction.trim(),
      })
    }

    if (variant.value === 'classic') {
      const steps = state.classic.steps.map((step) => step.trim()).filter(Boolean)
      if (steps.length) {
        sections.push({
          key: 'steps',
          letter: 'S',
          title: 'Steps',
          body: steps.map((step, index) => `${index + 1}. ${step}`).join('\n'),
        })
      }

      if (state.classic.endGoal.trim()) {
        sections.push({ key: 'end-goal', letter: 'E', title: 'End Goal', body: state.classic.endGoal.trim() })
      }

      if (state.classic.narrowing.trim()) {
        sections.push({ key: 'narrowing', letter: 'N', title: 'Narrowing', body: state.classic.narrowing.trim() })
      }
    } else {
      if (state.extended.structure.trim()) {
        sections.push({ key: 'structure', letter: 'S', title: 'Structure', body: state.extended.structure.trim() })
      }

      const examples = state.extended.examples.filter(
        (example) => example.input.trim() || example.output.trim(),
      )
      if (examples.length) {
        sections.push({
          key: 'examples',
          letter: 'E',
          title: 'Examples',
          body: examples
            .map(
              (example, index) =>
                `Example ${index + 1}:\nInput: ${example.input.trim() || '[Add input]'}\nOutput: ${example.output.trim() || '[Add output]'}`,
            )
            .join('\n\n'),
        })
      }

      if (state.extended.nuance.trim()) {
        sections.push({ key: 'nuance', letter: 'N', title: 'Nuance', body: state.extended.nuance.trim() })
      }
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

  const filledSectionCount = computed(() => previewSections.value.length)

  const updateExamples = (examples: ExamplePair[]) => {
    state.extended.examples = examples
  }

  return {
    variant,
    state,
    switchNotice,
    previewSections,
    assembledPrompt,
    wordCount,
    characterCount,
    filledSectionCount,
    setVariant,
    clearAll,
    applyTemplate,
    hydrate,
    updateExamples,
  }
}
