import { BookmarkButton } from '../containers/BookmarkButton'
import { DownloadButton } from '../containers/DownloadButton'
import type { FontItemView } from '../types'

import { DynamicFontText } from './DynamicFontText'

type Props = {
  fontItemView: FontItemView
}

/** 폰트 상세 페이지 헤더 컴포넌트 */
export const FontDetailHeader = ({ fontItemView }: Props) => {
  return (
    <header className='flex-between-center'>
      <div>
        <DynamicFontText
          fontName={fontItemView.fontName}
          fontUrl={fontItemView.fontAddr}
          className='text-accent text-5xl leading-12 font-bold'
          skeletonClassName='bg-secondary h-12 w-80 animate-pulse rounded'
        >
          {fontItemView.fontName}
        </DynamicFontText>
        <h3 className='text-description mt-2 text-lg leading-7 font-normal'>
          By {fontItemView.writerName}
        </h3>
      </div>
      <div className='flex gap-4'>
        <BookmarkButton
          fontId={fontItemView.fontId}
          fontName={fontItemView.fontName}
          isBookmarked={fontItemView.isBookmarked}
        />
        <DownloadButton fontName={fontItemView.fontName} fontId={fontItemView.fontId} />
      </div>
    </header>
  )
}
