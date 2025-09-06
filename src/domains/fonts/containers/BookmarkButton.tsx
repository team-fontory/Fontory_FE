import { Icon } from '@/shared/components/Icon/Icon'

import { useBookmark } from '../hooks/useBookmark'

type Props = {
  fontId: number
  fontName: string
  isBookmarked: boolean
}

/** 폰트 북마크 버튼 컴포넌트 */
export const BookmarkButton = ({ fontId, isBookmarked, fontName }: Props) => {
  const { handleBookmark } = useBookmark(fontId, isBookmarked)

  return (
    <button
      onClick={handleBookmark}
      className={`flex-align-center gap-1 rounded-md px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        isBookmarked
          ? 'bg-primary hover:bg-primary-point text-white'
          : 'bg-secondary text-accent hover:bg-secondary-point'
      }`}
      aria-label={`${fontName} ${isBookmarked ? '북마크 제거' : '북마크 추가'}`}
      aria-pressed={isBookmarked}
    >
      <Icon name='heart' size={16} />
      {isBookmarked ? '북마크됨' : '북마크'}
    </button>
  )
}
