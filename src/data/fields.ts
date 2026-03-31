import type { FieldDefinition, RisenVariant } from '../types/risen'

export const FIELD_DEFINITIONS: Record<RisenVariant, FieldDefinition[]> = {
  classic: [
    {
      key: 'role',
      letter: 'R',
      title: 'Role',
      helper: 'Set the persona or expertise the AI should adopt.',
      placeholder: 'Act as a senior product strategist helping a startup refine its roadmap.',
    },
    {
      key: 'instruction',
      letter: 'I',
      title: 'Instructions',
      helper: 'Describe the concrete task the AI should complete.',
      placeholder: 'Create a product launch plan for our new analytics feature aimed at operations teams.',
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
      placeholder: 'Deliver a launch brief with milestones, channel recommendations, and success metrics.',
    },
    {
      key: 'narrowing',
      letter: 'N',
      title: 'Narrowing',
      helper: 'Add constraints for tone, audience, scope, exclusions, or length.',
      placeholder: 'Keep it executive-friendly, under 600 words, and avoid generic marketing cliches.',
    },
  ],
  extended: [
    {
      key: 'role',
      letter: 'R',
      title: 'Role',
      helper: 'Set the persona or expertise the AI should adopt.',
      placeholder: 'Act as a senior support operations manager writing crisp internal playbooks.',
    },
    {
      key: 'instruction',
      letter: 'I',
      title: 'Instruction',
      helper: 'Describe the main task the AI should perform.',
      placeholder: 'Draft a troubleshooting guide for onboarding issues in our SaaS product.',
    },
    {
      key: 'structure',
      letter: 'S',
      title: 'Structure',
      helper: 'Specify the exact output format you want.',
      placeholder: 'Use markdown with sections for summary, common causes, step-by-step fixes, and escalation notes.',
    },
    {
      key: 'examples',
      letter: 'E',
      title: 'Examples',
      helper: 'Provide example inputs and outputs to anchor the response style.',
    },
    {
      key: 'nuance',
      letter: 'N',
      title: 'Nuance',
      helper: 'Capture tone, edge cases, style preferences, or things to avoid.',
      placeholder: 'Be calm and precise, note when users should contact support, and avoid blame-heavy language.',
    },
  ],
}
