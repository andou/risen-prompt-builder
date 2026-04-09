import { createDefaultState } from './constants'
import type { BuilderState, TemplatePreset } from '../types/risen'

const withClassic = (overrides: Partial<BuilderState>): BuilderState => ({
  ...createDefaultState(),
  ...overrides,
  steps: overrides.steps ?? createDefaultState().steps,
})

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'bug-triage',
    title: 'Bug Triage',
    description: 'Guide a coding agent through debugging and fixing a reproducible bug.',
    state: withClassic({
      role: 'Act as a senior full-stack engineer debugging a production issue.',
      instructions:
        'Investigate why [bug description] happens in [area of the app] and fix it safely.',
      steps: [
        'Inspect the failing behavior and summarize the likely root cause.',
        'Trace the relevant code paths and identify the minimal fix.',
        'Implement the fix without changing unrelated behavior.',
        'Add or update regression coverage and explain how to verify the fix.',
      ],
      endGoal: 'Deliver a root-cause summary, code fix, and regression test plan.',
      narrowing:
        'Keep the fix minimal, preserve public APIs, call out risks, and avoid speculative refactors.',
    }),
  },
  {
    id: 'feature-implementation',
    title: 'Feature Implementation',
    description: 'Plan and implement a scoped feature with clear acceptance criteria.',
    state: withClassic({
      role: 'Act as a senior product engineer implementing a feature in an existing codebase.',
      instructions:
        'Add [feature request] to the app while keeping the solution aligned with existing architecture and styling.',
      steps: [
        'Understand the existing implementation and identify the smallest integration points.',
        'Propose the file and state changes needed for the feature.',
        'Implement the feature following existing patterns and conventions.',
        'Verify behavior and summarize any follow-up work or edge cases.',
      ],
      endGoal:
        'Ship a working implementation for the requested feature with a concise explanation of the changes.',
      narrowing:
        'Preserve existing UX patterns, avoid unnecessary abstractions, and note any assumptions that affect scope.',
    }),
  },
  {
    id: 'refactor-module',
    title: 'Refactor Module',
    description: 'Restructure a messy area without changing its external behavior.',
    state: withClassic({
      role: 'Act as a senior software engineer improving maintainability in a legacy codebase.',
      instructions:
        'Refactor [module or component] to reduce complexity and duplication without changing user-visible behavior.',
      steps: [
        'Map the current responsibilities and pain points in the target module.',
        'Identify seams for extracting smaller units or simplifying control flow.',
        'Refactor incrementally while preserving runtime behavior.',
        'Validate that the refactor improves readability and keeps tests passing.',
      ],
      endGoal:
        'Produce a cleaner module structure with behavior preserved and technical debt reduced.',
      narrowing:
        'Avoid changing public contracts, prefer small composable helpers, and call out any risky areas before editing.',
    }),
  },
  {
    id: 'test-coverage',
    title: 'Test Coverage',
    description: 'Ask a coding agent to add or strengthen automated tests.',
    state: withClassic({
      role: 'Act as a senior engineer focused on improving test quality.',
      instructions:
        'Add meaningful automated tests for [feature, bugfix, or module] based on the project’s existing testing conventions.',
      steps: [
        'Identify the highest-value scenarios to cover based on the feature or bug.',
        'Inspect existing test patterns and choose the right test layer.',
        'Add focused tests with readable setup and assertions.',
        'Explain what behavior is now protected and any remaining gaps.',
      ],
      endGoal:
        'Deliver reliable automated tests that cover the target behavior and are easy to maintain.',
      narrowing:
        'Prefer deterministic tests, avoid brittle snapshots unless already standard, and keep setup minimal.',
    }),
  },
  {
    id: 'migration-plan',
    title: 'Migration Plan',
    description: 'Plan a safe multi-step migration for a codebase or dependency change.',
    state: withClassic({
      role: 'Act as a staff engineer planning a complex codebase migration.',
      instructions:
        'Create a migration plan for moving [current system] to [target system] in a way the team can execute safely.',
      steps: [
        'Audit the current usage and identify the migration surface area.',
        'Break the migration into safe incremental steps.',
        'Call out dependencies, blockers, and rollback considerations.',
        'Define how to verify each phase before moving on.',
      ],
      endGoal:
        'Produce an actionable migration plan that can be executed with low risk and clear checkpoints.',
      narrowing:
        'Optimize for incremental delivery, call out breaking changes early, and include fallback options where relevant.',
    }),
  },
]
