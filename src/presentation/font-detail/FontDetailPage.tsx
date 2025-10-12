import type { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'

import { useFontDetailViewModel } from '@/service/fonts/view-models/useFontDetailViewModel'
import { useFontItem } from '@/store/states/fontItem.store'

import { PageErrorFallback } from '../components/shared/PageErrorFallback'
import { PageLoader } from '../components/shared/PageLoader'

import { FontDetailHeader } from './components/FontDetailHeader'
import { FontDetailSidebar } from './components/FontDetailSidebar'
import { FontPreviewSection } from './components/FontPreviewSection'
import { RecommendFontSection } from './components/RecommendFontSection'

/** 데이터 로딩 상태에 따른 로딩 화면 표시 및 자식 컴포넌트를 렌더링 */
const FontDetailFetcher = ({ children }: PropsWithChildren) => {
  const { fontId } = useParams<{ fontId: string }>()
  const { isLoading } = useFontDetailViewModel(Number(fontId))

  if (isLoading) return <PageLoader />
  return children
}

/** 폰트 상세 페이지 컴포넌트 */
const FontDetailContainer = () => {
  const fontItem = useFontItem()
  if (!fontItem) return null

  return (
    <div className='mx-auto my-8 flex max-w-7xl justify-center gap-12 px-5'>
      <main className='w-[837.33px]'>
        <FontDetailHeader />
        <FontPreviewSection />
        <RecommendFontSection />
      </main>
      <FontDetailSidebar />
    </div>
  )
}

/** 폰트 상세 페이지 최상위 컴포넌트, 에러 바운더리 및 로딩 처리 포함 */
const FontDetailPage = () => {
  return (
    <ErrorBoundary FallbackComponent={PageErrorFallback}>
      <FontDetailFetcher>
        <FontDetailContainer />
      </FontDetailFetcher>
    </ErrorBoundary>
  )
}

export default FontDetailPage
