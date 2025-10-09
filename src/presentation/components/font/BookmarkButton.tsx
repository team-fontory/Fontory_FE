import { useToggleBookmark } from '@/service/fonts/hooks/useToggleBookmark'
import { Icon } from '@/shared/components/Icon/Icon'
import { cn } from '@/shared/utils/cn'

type BookmarkButtonProps = {
  fontId: number
  fontName: string
  isBookmarked: boolean
}

const BOOKMARK_BUTTON_STYLE =
  'flex-align-center gap-1 rounded-md px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const BOOKMARK_CONFIG = {
  bookmarked: {
    label: '북마크 제거',
    button: '북마크됨',
    style: 'bg-primary hover:bg-primary-point text-white',
  },
  nonBookmarked: {
    label: '북마크 추가',
    button: '북마크',
    style: 'bg-secondary text-accent hover:bg-secondary-point',
  },
} as const

/** 폰트 북마크 버튼 컴포넌트 */
export const BookmarkButton = ({
  fontId,
  isBookmarked,
  fontName,
}: BookmarkButtonProps) => {
  const { handleBookmark } = useToggleBookmark(fontId, isBookmarked)
  const buttonConfig = isBookmarked
    ? BOOKMARK_CONFIG.bookmarked
    : BOOKMARK_CONFIG.nonBookmarked

  return (
    <button
      onClick={handleBookmark}
      className={cn(BOOKMARK_BUTTON_STYLE, buttonConfig.style)}
      aria-label={`${fontName} ${buttonConfig.label}`}
      aria-pressed={isBookmarked}
    >
      <Icon name='heart' size={16} />
      {buttonConfig.button}
    </button>
  )
}
