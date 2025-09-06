import { BookmarkButton } from '../containers/BookmarkButton'
import { DownloadButton } from '../containers/DownloadButton'
import type { FontDetail } from '../types/font.type'

import { DynamicFontText } from './DynamicFontText'

type Props = {
  fontDetail: FontDetail
}

/** 폰트 상세 페이지 헤더 컴포넌트 */
export const FontDetailHeader = ({ fontDetail }: Props) => {
  return (
    <header className='flex-between-center'>
      <div>
        <DynamicFontText
          fontName={fontDetail.fontName}
          fontUrl={fontDetail.fontAddr}
          className='text-accent text-5xl leading-12 font-bold'
          skeletonClassName='bg-secondary h-12 w-80 animate-pulse rounded'
        >
          {fontDetail.fontName}
        </DynamicFontText>
        <h3 className='text-description mt-2 text-lg leading-7 font-normal'>
          By {fontDetail.writerName}
        </h3>
      </div>
      <div className='flex gap-4'>
        <BookmarkButton
          fontId={fontDetail.fontId}
          fontName={fontDetail.fontName}
          isBookmarked={fontDetail.isBookmarked}
        />
        <DownloadButton fontName={fontDetail.fontName} fontId={fontDetail.fontId} />
      </div>
    </header>
  )
}
