import type { PropsWithChildren } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { Link, type To, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useFontDetailViewModel } from '@/service/fonts/view-models/useFontDetailViewModel'
import { useFontItem } from '@/store/states/fontItem.store'

import { PageLoader } from '../components/shared/PageLoader'

import { FontDetailHeader } from './components/FontDetailHeader'
import { FontDetailSidebar } from './components/FontDetailSidebar'
import { FontPreviewSection } from './components/FontPreviewSection'
import { RecommendFontSection } from './components/RecommendFontSection'

/** 에러 바운더리 내 에러 발생 시 호출되는 대체 UI 컴포넌트 */
const FontDetailErrorBoundary = ({ error }: FallbackProps) => {
  toast.error(error.message)

  return (
    <div className='flex-center my-20 h-full flex-col p-4'>
      <h2 className='text-red mb-4 text-2xl font-bold'>문제가 발생했습니다</h2>
      <p className='mb-4 text-gray-600'>{error.message}</p>
      <Link
        to={-1 as To}
        className='bg-primary hover:bg-primary-dark rounded px-4 py-2 text-white'
        replace
      >
        뒤로가기
      </Link>
    </div>
  )
}

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
    <ErrorBoundary FallbackComponent={FontDetailErrorBoundary}>
      <FontDetailFetcher>
        <FontDetailContainer />
      </FontDetailFetcher>
    </ErrorBoundary>
  )
}

export default FontDetailPage
