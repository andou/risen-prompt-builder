import { createDefaultState } from './constants'
import type { BuilderState, TemplatePreset } from '../types/risen'

const withClassic = (overrides: Partial<BuilderState['classic']>, shared?: Partial<BuilderState>): BuilderState => ({
  ...createDefaultState(),
  ...shared,
  classic: {
    ...createDefaultState().classic,
    ...overrides,
  },
})

const withExtended = (
  overrides: Partial<BuilderState['extended']>,
  shared?: Partial<BuilderState>,
): BuilderState => ({
  ...createDefaultState(),
  ...shared,
  extended: {
    ...createDefaultState().extended,
    ...overrides,
  },
})

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'blog-post-writer',
    title: 'Blog Post Writer',
    description: 'Create a publish-ready article outline and draft prompt.',
    variants: {
      classic: {
        state: withClassic(
          {
            steps: ['Research the topic and target audience.', 'Outline the article structure.', 'Draft the article with supporting examples.', 'Review for clarity, SEO, and flow.'],
            endGoal: 'Deliver a publish-ready 800-word blog post.',
            narrowing: 'Use a conversational tone, stay SEO-friendly, and avoid jargon.',
          },
          {
            role: 'Act as a professional content writer for a modern B2B SaaS brand.',
            instruction: 'Write a blog post on [topic] that educates readers and leads naturally into our product category.',
          },
        ),
      },
      extended: {
        state: withExtended(
          {
            structure: 'Return markdown with a headline, short intro, 3-4 subsections, and a closing takeaway.',
            examples: [
              {
                id: crypto.randomUUID(),
                input: 'Topic: reducing reporting bottlenecks',
                output: 'A structured article with actionable advice, practical examples, and a concise conclusion.',
              },
            ],
            nuance: 'Keep it conversational, SEO-aware, and free of fluffy claims or jargon.',
          },
          {
            role: 'Act as a professional content writer for a modern B2B SaaS brand.',
            instruction: 'Write a blog post on [topic] that teaches the reader something useful and reads like a polished editorial draft.',
          },
        ),
      },
    },
  },
  {
    id: 'code-reviewer',
    title: 'Code Reviewer',
    description: 'Review code changes with practical engineering feedback.',
    variants: {
      classic: {
        state: withClassic(
          {
            steps: ['Check correctness against the stated goal.', 'Identify bugs or edge cases.', 'Suggest maintainability improvements.', 'Assess readability and developer ergonomics.'],
            endGoal: 'Provide an actionable review with code suggestions and priority levels.',
            narrowing: 'Be constructive, prioritize critical issues first, and include inline code examples where helpful.',
          },
          {
            role: 'Act as a senior software engineer reviewing a pull request.',
            instruction: 'Review the provided code for correctness, maintainability, and developer experience.',
          },
        ),
      },
      extended: {
        state: withExtended(
          {
            structure: 'Return markdown with sections for critical issues, suggested improvements, and final assessment.',
            examples: [
              {
                id: crypto.randomUUID(),
                input: 'A function with no input validation and duplicated logic.',
                output: 'Flag the missing validation as higher priority, then suggest a small refactor for duplication.',
              },
            ],
            nuance: 'Be direct but respectful, focus on high-signal feedback, and avoid nitpicks unless they affect readability.',
          },
          {
            role: 'Act as a senior software engineer reviewing a pull request.',
            instruction: 'Review the provided code and give actionable feedback with rationale.',
          },
        ),
      },
    },
  },
  {
    id: 'data-analysis-report',
    title: 'Data Analysis Report',
    description: 'Turn a dataset brief into a clear findings report prompt.',
    variants: {
      classic: {
        state: withClassic(
          {
            steps: ['Clean and inspect the data.', 'Identify trends and anomalies.', 'Recommend useful visualizations.', 'Summarize the key findings.'],
            endGoal: 'Produce an executive summary with key insights and chart recommendations.',
            narrowing: 'Use plain language, keep it under two pages, and highlight anomalies clearly.',
          },
          {
            role: 'Act as a data analyst preparing a report for non-technical stakeholders.',
            instruction: 'Analyze the provided dataset and explain the most important patterns and changes.',
          },
        ),
      },
      extended: {
        state: withExtended(
          {
            structure: 'Return a concise report with headings for summary, trends, anomalies, and recommended charts.',
            examples: [
              {
                id: crypto.randomUUID(),
                input: 'Sales decline in one region while all others grow.',
                output: 'Call out the anomaly explicitly, quantify the difference, and suggest likely next questions.',
              },
            ],
            nuance: 'Use plain language, avoid statistical jargon where possible, and make tradeoffs explicit.',
          },
          {
            role: 'Act as a data analyst preparing a report for non-technical stakeholders.',
            instruction: 'Analyze the provided dataset and synthesize the main findings into a practical report.',
          },
        ),
      },
    },
  },
  {
    id: 'email-drafter',
    title: 'Email Drafter',
    description: 'Create concise, professional email prompts.',
    variants: {
      classic: {
        state: withClassic(
          {
            steps: ['Understand the audience and goal.', 'Write a subject line.', 'Draft the email body.', 'Close with a clear CTA.'],
            endGoal: 'Produce a ready-to-send email draft.',
            narrowing: 'Keep it concise, professional but warm, and under 200 words.',
          },
          {
            role: 'Act as a professional communications specialist.',
            instruction: 'Draft an email for [context] that balances clarity, professionalism, and warmth.',
          },
        ),
      },
      extended: {
        state: withExtended(
          {
            structure: 'Return a subject line followed by the email body in plain prose.',
            examples: [
              {
                id: crypto.randomUUID(),
                input: 'Rescheduling a client call.',
                output: 'A clear subject line, apology for the shift, new time options, and a polite CTA.',
              },
            ],
            nuance: 'Keep the tone professional, warm, and efficient; avoid over-explaining.',
          },
          {
            role: 'Act as a professional communications specialist.',
            instruction: 'Draft an email for [context] that sounds polished, human, and ready to send.',
          },
        ),
      },
    },
  },
  {
    id: 'technical-documentation',
    title: 'Technical Documentation',
    description: 'Generate API or feature documentation prompts.',
    variants: {
      classic: {
        state: withClassic(
          {
            steps: ['Describe the feature purpose.', 'List parameters or inputs.', 'Provide usage examples.', 'Call out edge cases and caveats.'],
            endGoal: 'Produce a clear technical reference document for developers.',
            narrowing: 'Target a developer audience, include code snippets, and avoid marketing language.',
          },
          {
            role: 'Act as a technical writer documenting a product feature or API.',
            instruction: 'Write documentation for [feature/API] that helps developers understand usage quickly.',
          },
        ),
      },
      extended: {
        state: withExtended(
          {
            structure: 'Return markdown with overview, parameters, examples, and edge cases sections.',
            examples: [
              {
                id: crypto.randomUUID(),
                input: 'An endpoint that paginates results.',
                output: 'Document default pagination behavior, query params, example requests, and error cases.',
              },
            ],
            nuance: 'Write for developers, keep explanations precise, and avoid promotional wording.',
          },
          {
            role: 'Act as a technical writer documenting a product feature or API.',
            instruction: 'Write documentation for [feature/API] that is crisp, accurate, and practical for implementation.',
          },
        ),
      },
    },
  },
]
