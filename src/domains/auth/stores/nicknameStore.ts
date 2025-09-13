import { create } from 'zustand'

type NicknameCheckState = {
  checkedNickname: string | null
  isChecked: boolean
  isAvailable: boolean
}

type NicknameCheckActions = {
  setNicknameCheck: (nickname: string, isAvailable: boolean) => void
  resetNicknameCheck: () => void
  isNicknameChecked: (nickname: string) => boolean
}

export const useNicknameStore = create<NicknameCheckState & NicknameCheckActions>((set, get) => ({
  checkedNickname: null,
  isChecked: false,
  isAvailable: false,

  setNicknameCheck: (nickname: string, isAvailable: boolean) =>
    set({
      checkedNickname: nickname,
      isChecked: true,
      isAvailable,
    }),

  resetNicknameCheck: () =>
    set({
      checkedNickname: null,
      isChecked: false,
      isAvailable: false,
    }),

  isNicknameChecked: (nickname: string) => {
    const state = get()
    return state.checkedNickname === nickname && state.isChecked
  },
}))

export const useIsNickNameChecked = () => useNicknameStore((state) => state.isChecked)
