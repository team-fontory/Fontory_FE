import { BookmarkButton } from '@/presentation/components/font/BookmarkButton'
import { DownloadButton } from '@/presentation/components/font/DownloadButton'
import { DynamicFont } from '@/presentation/components/font/DynamicFont'
import type { FontItemModel } from '@/service/fonts/types/fontModel.type'

type FontDetailHeaderProps = FontItemModel

/** 폰트 상세 페이지 헤더 컴포넌트 */
export const FontDetailHeader = (fontItem: FontDetailHeaderProps) => {
  const { fontId, fontName, fontAddr, isBookmarked, writerName } = fontItem
  return (
    <header className='flex-between-center'>
      <div>
        <DynamicFont fontName={fontName} fontUrl={fontAddr}>
          <DynamicFont.Skeleton className='h-12 w-80' />
          <DynamicFont.Text className='text-5xl leading-12'>
            {fontName}
          </DynamicFont.Text>
        </DynamicFont>
        <h3 className='text-description mt-2 text-lg leading-7 font-normal'>
          By {writerName}
        </h3>
      </div>

      <div className='flex gap-4'>
        <BookmarkButton
          fontId={fontId}
          fontName={fontName}
          isBookmarked={isBookmarked}
        />
        <DownloadButton fontName={fontName} fontId={fontId} />
      </div>
    </header>
  )
}
