import { Link } from 'react-router-dom'

import { createRoute } from '@/app/router/routes.constant'

import { BookmarkButton } from '../containers/BookmarkButton'
import { DownloadButton } from '../containers/DownloadButton'
import type { FontDetails } from '../types/font.type'

type Props = FontDetails

/** 폰트 미리보기 아이템 컴포넌트 */
export const FontPreviewItem = ({
  fontId,
  fontName,
  example,
  writerName,
  isBookmarked = false,
  downloadCount = 0,
  bookmarkCount = 0,
  fontAddr,
}: Props) => {
  return (
    <article className='group border-b border-gray-100 px-4 py-6 transition-colors hover:bg-gray-50'>
      <div className='flex-between-center gap-6'>
        <Link
          to={createRoute.fontDetail(fontId)}
          className='flex-column group-hover:text-primary grow gap-3 transition-colors'
          aria-label={`${fontName} 폰트 상세보기`}
        >
          <div className='flex-column gap-2'>
            <p
              className='text-accent line-clamp-2 text-xl leading-relaxed font-medium'
              style={{ fontFamily: fontName }}
              lang='ko'
            >
              {example}
            </p>
            <div className='flex-align-center gap-2 text-sm'>
              <span className='text-accent font-semibold'>{fontName}</span>
              <span className='text-description'>by {writerName}</span>
            </div>
          </div>
          <div className='flex-align-center text-footer-description gap-4 text-xs'>
            <span className='flex-align-center gap-1'>
              <span className='bg-primary h-2 w-2 rounded-full'></span>
              북마크 {bookmarkCount.toLocaleString()}
            </span>
            <span className='flex-align-center gap-1'>
              <span className='bg-disabled h-2 w-2 rounded-full'></span>
              다운로드 {downloadCount.toLocaleString()}
            </span>
          </div>
        </Link>

        <div className='flex flex-shrink-0 gap-2' onClick={(e) => e.stopPropagation()}>
          <BookmarkButton fontId={fontId} fontName={fontName} isBookmarked={isBookmarked} />
          <DownloadButton fontId={fontId} fontName={fontName} fontAddr={fontAddr} />
        </div>
      </div>
    </article>
  )
}
