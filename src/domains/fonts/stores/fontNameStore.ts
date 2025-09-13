import { create } from 'zustand'

type FontNameCheckActions = {
  setFontNameCheck: (fontName: string, isAvailable: boolean) => void
  resetFontNameCheck: () => void
  isFontNameChecked: (fontName: string) => boolean
}

type FontNameCheckState = {
  checkedFontName: string | null // 직전에 검사한 폰트 이름
  isChecked: boolean // 검사 완료 여부
  isAvailable: boolean // 사용 가능 여부
  actions: FontNameCheckActions
}

export const useFontNameStore = create<FontNameCheckState>((set, get) => ({
  checkedFontName: null,
  isChecked: false,
  isAvailable: false,
  actions: {
    setFontNameCheck: (fontName: string, isAvailable: boolean) =>
      set({
        checkedFontName: fontName,
        isChecked: true,
        isAvailable,
      }),

    resetFontNameCheck: () =>
      set({
        checkedFontName: null,
        isChecked: false,
        isAvailable: false,
      }),

    isFontNameChecked: (fontName: string) => {
      const state = get()
      return state.checkedFontName === fontName && state.isChecked
    },
  },
}))

export const useIsFontNameAvailable = () => useFontNameStore((state) => state.isAvailable)
export const useFontNameCheckActions = () => useFontNameStore((state) => state.actions)
