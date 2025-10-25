import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router-dom'

import { createRoute } from '@/app/router/routes.constant'
import { DynamicFont } from '@/presentation/_components/font/DynamicFont'
import { PageLoader } from '@/presentation/_components/shared/PageLoader'
import type { FontItemModel } from '@/service/fonts/fontModel.type'
import { usePopularFontListViewModel } from '@/service/fonts/view-models/usePopularFontListViewModel'

/** 인기 폰트 단일 카드 컴포넌트 */
const PopularFontCard = (font: FontItemModel) => {
  return (
    <Link
      key={font.fontId}
      to={createRoute.fontDetail(font.fontId)}
      className='flex-column border-secondary gap-4 rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
    >
      <DynamicFont fontName={font.fontName} fontUrl={font.fontAddr}>
        <DynamicFont.Skeleton className='border-secondary flex-center min-h-56 grow rounded-lg border p-4' />
        <DynamicFont.Text className='border-secondary flex-center min-h-56 grow rounded-lg border p-4 text-center text-lg leading-relaxed'>
          {font.example}
        </DynamicFont.Text>
      </DynamicFont>
      <div>
        <h3 className='text-accent text-base leading-7 font-bold'>
          {font.fontName}
        </h3>
        <p className='text-description text-sm leading-5'>
          by {font.writerName}
        </p>
        <div className='text-description mt-2 flex gap-3 text-xs'>
          <span>다운로드 {font.downloadCount}</span>
          <span>북마크 {font.bookmarkCount}</span>
        </div>
      </div>
    </Link>
  )
}

/** 인기 폰트 섹션 컴포넌트 */
const PopularFontContainer = () => {
  const { isLoading, fontList: popularFontList } = usePopularFontListViewModel()

  if (isLoading) return <PageLoader />
  if (!popularFontList?.length) return null

  return (
    <section className='mt-8' aria-labelledby='popular-fonts-title'>
      <h2
        id='popular-fonts-title'
        className='py-5 text-2xl leading-8 font-bold'
      >
        인기 폰트
      </h2>

      <div className='grid grid-cols-1 gap-8 py-4 md:grid-cols-3'>
        {popularFontList.map((font) => (
          <PopularFontCard key={font.fontId} {...font} />
        ))}
      </div>
    </section>
  )
}

/** 인기 폰트 섹션 최상위 컴포넌트 */
export const PopularFontSection = () => {
  return (
    <ErrorBoundary fallback={null}>
      <PopularFontContainer />
    </ErrorBoundary>
  )
}
