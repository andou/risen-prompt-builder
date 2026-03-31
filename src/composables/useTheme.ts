import { computed, ref, watch } from 'vue'
import { THEME_STORAGE_KEY } from '../data/constants'
import type { ThemeMode } from '../types/risen'

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useTheme = () => {
  const theme = ref<ThemeMode>(getPreferredTheme())

  const applyTheme = (value: ThemeMode) => {
    document.documentElement.dataset.theme = value
    document.documentElement.classList.toggle('dark', value === 'dark')
  }

  watch(
    theme,
    (value) => {
      applyTheme(value)
      window.localStorage.setItem(THEME_STORAGE_KEY, value)
    },
    { immediate: true },
  )

  return {
    theme,
    isDark: computed(() => theme.value === 'dark'),
    toggleTheme: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    },
  }
}
