import { BookmarkButton } from '@/presentation/_components/font/BookmarkButton'
import { DownloadButton } from '@/presentation/_components/font/DownloadButton'
import { EmptyFontListMessage } from '@/presentation/_components/font/EmptyFontListMessage'
import { FontItem } from '@/presentation/_components/font/FontItem'
import { RemoveFontButton } from '@/presentation/font-progress/components/RemoveFontButton'
import type {
  FontItemModel,
  FontListModel,
} from '@/service/fonts/fontModel.type'

/** 폰트 미리보기 아이템 컴포넌트 */
const FontPreviewItem = ({
  fontId,
  fontName,
  example,
  writerName,
  isBookmarked = false,
  downloadCount = '0',
  bookmarkCount = '0',
  fontAddr,
}: FontItemModel) => {
  return (
    <FontItem>
      <FontItem.Info fontId={fontId} fontName={fontName}>
        <div className='flex-column gap-2'>
          <FontItem.Preview
            fontName={fontName}
            fontAddr={fontAddr}
            example={example}
          />
          <FontItem.Meta fontName={fontName} writerName={writerName} />
        </div>
        <FontItem.Stats
          downloadCount={downloadCount}
          bookmarkCount={bookmarkCount}
        />
      </FontItem.Info>

      <FontItem.Actions>
        <BookmarkButton
          fontId={fontId}
          fontName={fontName}
          isBookmarked={isBookmarked}
        />
        <DownloadButton fontId={fontId} fontName={fontName} />
        <RemoveFontButton fontId={fontId} fontName={fontName} />
      </FontItem.Actions>
    </FontItem>
  )
}

type ProgressFontListSectionProps = {
  fontList: FontListModel
  emptyMessage: string
}

/** 폰트 목록 컴포넌트 */
export const ProgressFontListSection = ({
  fontList,
  emptyMessage,
}: ProgressFontListSectionProps) => {
  if (!fontList.length) {
    return <EmptyFontListMessage message={emptyMessage} />
  }

  return (
    <div id='font-list' className='flex-column py-6' role='tabpanel'>
      {fontList.map((font) => (
        <FontPreviewItem key={font.fontId} {...font} />
      ))}
    </div>
  )
}
