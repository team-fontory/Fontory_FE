import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { toast } from 'react-toastify'

import { PageLoader } from '@/presentation/_components/shared/PageLoader'
import { Pagination } from '@/presentation/_components/shared/Pagination'
import { useCompletedFontListViewModel } from '@/service/fonts/view-models/useCompletedFontListViewModel'

import { ProgressFontListSection } from './ProgressFontListSection'

/** 에러 바운더리 내 에러 발생 시 호출되는 대체 UI 컴포넌트 */
const CompletedFontErrorBoundary = ({ error }: FallbackProps) => {
  toast.error(error.message)
  return null
}

export const CompletedFontContainer = () => {
  const { isLoading, fontList, totalPages } = useCompletedFontListViewModel()

  if (isLoading) return <PageLoader />

  return (
    <section className='flex-column gap-4'>
      <h3 className='text-accent-light text-2xl leading-8 font-bold'>
        제작 완료된 폰트
      </h3>
      <ProgressFontListSection
        fontList={fontList}
        emptyMessage='제작이 완료된 폰트가 없습니다.'
      />
      <Pagination totalPages={totalPages} showPages={5} className='mt-6' />
    </section>
  )
}

export const CompletedFontSection = () => {
  return (
    <ErrorBoundary FallbackComponent={CompletedFontErrorBoundary}>
      <CompletedFontContainer />
    </ErrorBoundary>
  )
}
