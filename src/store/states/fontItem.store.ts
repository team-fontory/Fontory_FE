import { create } from 'zustand'

import type { FontItemModel } from '@/service/fonts/fontModel.type'

type FontStoreActions = {
  setFontItem: (info: FontItemModel) => void
  clearFontItem: () => void
}

type FontStoreState = {
  font: FontItemModel | null
  actions: FontStoreActions
}

/** 단일 폰트 아이템 전역 스토어 */
const useFontStore = create<FontStoreState>((set) => ({
  font: null,
  actions: {
    setFontItem: (info) => set({ font: info }),
    clearFontItem: () => set({ font: null }),
  },
}))

export const useFontItem = () => useFontStore((state) => state.font)
export const useFontItemActions = () => useFontStore((state) => state.actions)
