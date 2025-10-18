import { BookmarkButton } from '@/presentation/_components/font/BookmarkButton'
import { DownloadButton } from '@/presentation/_components/font/DownloadButton'
import { DynamicFont } from '@/presentation/_components/font/DynamicFont'
import { useFontItem } from '@/store/states/fontItem.store'

/** 폰트 상세 페이지 헤더 컴포넌트 */
export const FontDetailHeader = () => {
  const fontItem = useFontItem()
  if (!fontItem) return null

  return (
    <header className='flex-between-center'>
      <div>
        <DynamicFont fontName={fontItem.fontName} fontUrl={fontItem.fontAddr}>
          <DynamicFont.Skeleton className='h-12 w-80' />
          <DynamicFont.Text className='text-5xl leading-12'>
            {fontItem.fontName}
          </DynamicFont.Text>
        </DynamicFont>
        <h3 className='text-description mt-2 text-lg leading-7 font-normal'>
          By {fontItem.writerName}
        </h3>
      </div>

      <div className='flex gap-4'>
        <BookmarkButton
          fontId={fontItem.fontId}
          fontName={fontItem.fontName}
          isBookmarked={fontItem.isBookmarked}
        />
        <DownloadButton fontName={fontItem.fontName} fontId={fontItem.fontId} />
      </div>
    </header>
  )
}
