import { useState } from 'react'

import { Icon } from '@/shared/components/Icon/Icon'

type Props = {
  fontId: number
  fontName: string
  isBookmarked: boolean
}

/** 폰트 북마크 버튼 컴포넌트 */
export const BookmarkButton = ({ isBookmarked, fontName, fontId }: Props) => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isLoading) return

    setIsLoading(true)

    try {
      // API 호출
      const newBookmarkState = !isBookmarkedState
      setIsBookmarkedState(newBookmarkState)
    } catch (error) {
      console.error('북마크 처리 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={isLoading}
      className={`flex-align-center gap-1 rounded-md px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        isBookmarkedState
          ? 'bg-primary hover:bg-primary-point text-white'
          : 'bg-secondary text-accent hover:bg-secondary-point'
      }`}
      aria-label={`${fontName} ${isBookmarkedState ? '북마크 제거' : '북마크 추가'}`}
      aria-pressed={isBookmarkedState}
    >
      <Icon name='heart' size={16} />
      {isBookmarkedState ? '북마크됨' : '북마크'}
    </button>
  )
}
