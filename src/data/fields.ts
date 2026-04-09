import type { FieldDefinition } from '../types/risen'

export const FIELD_DEFINITIONS: FieldDefinition[] = [
  {
    key: 'role',
    letter: 'R',
    title: 'Role',
    helper: 'Set the persona or expertise the AI should adopt.',
    placeholder: 'Act as a senior software engineer working inside an existing product codebase.',
  },
  {
    key: 'instructions',
    letter: 'I',
    title: 'Instructions',
    helper: 'Describe the concrete task the coding agent should complete.',
    placeholder: 'Investigate why the settings page crashes after save and implement the smallest safe fix.',
  },
  {
    key: 'steps',
    letter: 'S',
    title: 'Steps',
    helper: 'Break the work into a clear sequence of actions.',
  },
  {
    key: 'endGoal',
    letter: 'E',
    title: 'End Goal',
    helper: 'Define the final deliverable you want back.',
    placeholder: 'Deliver a verified fix, explain the root cause, and summarize what changed.',
  },
  {
    key: 'narrowing',
    letter: 'N',
    title: 'Narrowing',
    helper: 'Add constraints for tone, scope, testing expectations, or things to avoid.',
    placeholder: 'Keep the patch minimal, preserve existing APIs, mention risks, and include verification steps.',
  },
]
