'use client'

import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: typeof window !== 'undefined'
    ? localStorage.getItem('theme') || 'dark'
    : 'dark',

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', newTheme)
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      return { theme: newTheme }
    }),

  setTheme: (newTheme) => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    set({ theme: newTheme })
  },
}))
