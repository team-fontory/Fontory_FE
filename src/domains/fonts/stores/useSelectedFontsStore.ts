import { create } from 'zustand'

import type { FontItemView } from '../types'

type SelectedFontsActions = {
  addFont: (font: FontItemView) => void
  removeFont: (fontId: number) => void
  clearFonts: () => void
}

type SelectedFontsHelpers = {
  canAddFont: (fontId: number) => boolean
  isFontSelected: (fontId: number) => boolean
}

type SelectedFontsState = {
  selectedFonts: FontItemView[]
  isMaxSelected: boolean
  actions: SelectedFontsActions
} & SelectedFontsHelpers

export const useSelectedFontsStore = create<SelectedFontsState>((set, get) => ({
  selectedFonts: [],
  get isMaxSelected() {
    return get().selectedFonts.length >= 2
  },

  actions: {
    addFont: (font) => {
      if (get().canAddFont(font.fontId)) {
        set({ selectedFonts: [...get().selectedFonts, font] })
      }
    },

    removeFont: (fontId) => {
      set({
        selectedFonts: get().selectedFonts.filter((font) => font.fontId !== fontId),
      })
    },

    clearFonts: () => {
      set({ selectedFonts: [] })
    },
  },

  canAddFont: (fontId) => {
    const selectedFonts = get().selectedFonts
    return selectedFonts.length < 2 && !selectedFonts.some((font) => font.fontId === fontId)
  },

  isFontSelected: (fontId) => {
    return get().selectedFonts.some((font) => font.fontId === fontId)
  },
}))

export const useSelectedFontsList = () => useSelectedFontsStore((state) => state.selectedFonts)
export const useIsMaxSelected = () => useSelectedFontsStore((state) => state.isMaxSelected)
export const useSelectedFontsActions = () => useSelectedFontsStore((state) => state.actions)

export const useCanAddFont = () => useSelectedFontsStore((state) => state.canAddFont)
export const useIsFontSelected = () => useSelectedFontsStore((state) => state.isFontSelected)
