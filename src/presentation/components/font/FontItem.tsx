import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import { createRoute } from '@/app/router/routes.constant'
import type { FontItemModel } from '@/service/fonts/types/fontModel.type'
import { cn } from '@/shared/utils/cn'

import { DynamicFont } from './DynamicFont'

type FontItemProps = {
  selected?: boolean
}

type FontInfoProps = {
  fontId: number
  fontName: string
}

type FontPreviewProps = Pick<FontItemModel, 'fontName' | 'fontAddr' | 'example'>
type FontMetaProps = Pick<FontItemModel, 'fontName' | 'writerName'>
type FontStatsProps = Pick<FontItemModel, 'downloadCount' | 'bookmarkCount'>

/** 폰트 아이템 컨테이너 */
const FontItemContainer = ({
  children,
  selected = false,
}: PropsWithChildren<FontItemProps>) => {
  return (
    <article
      className={cn(
        `group rounded-lg border-b border-gray-100 bg-white px-4 py-6 transition-colors hover:bg-gray-50`,
        selected ? 'border-blue-200 bg-blue-50' : '',
      )}
    >
      <div className='flex-between-center gap-6'>{children}</div>
    </article>
  )
}

/** 폰트 정보 링크 래퍼 */
const FontInfo = ({
  children,
  fontId,
  fontName,
}: PropsWithChildren<FontInfoProps>) => {
  return (
    <Link
      to={createRoute.fontDetail(fontId)}
      className='flex-column group-hover:text-primary grow gap-3 transition-colors'
      aria-label={`${fontName} 폰트 상세보기`}
    >
      {children}
    </Link>
  )
}

/** 폰트 미리보기 */
const FontPreview = ({ fontName, fontAddr, example }: FontPreviewProps) => {
  return (
    <DynamicFont fontName={fontName} fontUrl={fontAddr}>
      <DynamicFont.Skeleton className='h-6 w-full' />
      <DynamicFont.Text className='line-clamp-2 text-2xl leading-relaxed'>
        {example}
      </DynamicFont.Text>
    </DynamicFont>
  )
}

/** 폰트 메타 정보 (이름, 작성자) */
const FontMeta = ({ fontName, writerName }: FontMetaProps) => {
  return (
    <div className='flex-align-center gap-2 text-sm'>
      <span className='text-accent font-semibold'>{fontName}</span>
      <span className='text-description'>by {writerName}</span>
    </div>
  )
}

/** 폰트 통계 (북마크, 다운로드) */
const FontStats = ({ downloadCount, bookmarkCount }: FontStatsProps) => {
  return (
    <div className='flex-align-center text-footer-description gap-4 text-xs'>
      <span className='flex-align-center gap-1'>
        <span className='bg-primary h-2 w-2 rounded-full'></span>
        북마크 {bookmarkCount}
      </span>
      <span className='flex-align-center gap-1'>
        <span className='bg-disabled h-2 w-2 rounded-full'></span>
        다운로드 {downloadCount}
      </span>
    </div>
  )
}

/** 폰트 액션 버튼 영역 */
const FontActions = ({ children }: PropsWithChildren) => {
  return (
    <div
      className='flex flex-shrink-0 gap-2'
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

/** 폰트 아이템 컴포넌트 */
export const FontItem = Object.assign(FontItemContainer, {
  Info: FontInfo,
  Preview: FontPreview,
  Meta: FontMeta,
  Stats: FontStats,
  Actions: FontActions,
})
