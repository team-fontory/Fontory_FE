import { create } from 'zustand'

import type {
  FontItemModel,
  FontListModel,
} from '@/service/fonts/types/fontModel.type'

type SelectedFontsActionList = {
  addFont: (font: FontItemModel) => void
  removeFont: (fontId: number) => void
  clearFontList: () => void
}

type SelectedFontListHelpers = {
  canAddFont: (fontId: number) => boolean
  isFontSelected: (fontId: number) => boolean
}

type SelectedFontListState = {
  selectedFontList: FontListModel
  isMaxSelected: boolean
  actions: SelectedFontsActionList
} & SelectedFontListHelpers

export const useSelectedFontListStore = create<SelectedFontListState>(
  (set, get) => ({
    selectedFontList: [],
    get isMaxSelected() {
      return get().selectedFontList.length >= 2
    },

    actions: {
      addFont: (font) => {
        if (get().canAddFont(font.fontId)) {
          set({ selectedFontList: [...get().selectedFontList, font] })
        }
      },
      removeFont: (fontId) => {
        set({
          selectedFontList: get().selectedFontList.filter(
            (font) => font.fontId !== fontId,
          ),
        })
      },
      clearFontList: () => {
        set({ selectedFontList: [] })
      },
    },

    canAddFont: (fontId) => {
      const selectedFontList = get().selectedFontList
      return (
        selectedFontList.length < 2 &&
        !selectedFontList.some((font) => font.fontId === fontId)
      )
    },
    isFontSelected: (fontId) => {
      return get().selectedFontList.some((font) => font.fontId === fontId)
    },
  }),
)

export const useSelectedFontList = () =>
  useSelectedFontListStore((state) => state.selectedFontList)
export const useIsMaxSelected = () =>
  useSelectedFontListStore((state) => state.isMaxSelected)
export const useSelectedFontListActions = () =>
  useSelectedFontListStore((state) => state.actions)

export const useCanAddFont = (fontId: number) =>
  useSelectedFontListStore((state) => state.canAddFont(fontId))
export const useIsFontSelected = (fontId: number) =>
  useSelectedFontListStore((state) => state.isFontSelected(fontId))
