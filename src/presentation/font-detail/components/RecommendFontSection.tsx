import { ErrorBoundary } from 'react-error-boundary'
import { useParams } from 'react-router-dom'

import { FontListSection } from '@/presentation/_components/font/FontListSection'
import { PageLoader } from '@/presentation/_components/shared/PageLoader'
import { useRecommendListViewModel } from '@/service/fonts/view-models/useRecommendListViewModel'
import { useFontItem } from '@/store/states/fontItem.store'

/** 제작자의 다른 폰트 추천 섹션 컴포넌트 */
export const RecommendFontContainer = () => {
  const fontItem = useFontItem()
  const { fontId } = useParams<{ fontId: string }>()
  const { isLoading, recommendList } = useRecommendListViewModel(Number(fontId))

  if (isLoading) return <PageLoader />
  if (!recommendList.length) return null

  return (
    <section className='mt-20'>
      <h4 className='text-accent-light text-2xl leading-8 font-bold'>
        {fontItem ? `${fontItem.writerName}님이 제작한 다른 폰트` : ''}
      </h4>

      <FontListSection
        fontList={recommendList}
        emptyMessage='제작자의 생성한 다른 폰트가 존재하지 않습니다.'
      />
    </section>
  )
}

export const RecommendFontSection = () => {
  return (
    <ErrorBoundary fallback={null}>
      <RecommendFontContainer />
    </ErrorBoundary>
  )
}
