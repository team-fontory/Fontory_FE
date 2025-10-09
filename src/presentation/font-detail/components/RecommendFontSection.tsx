import { useParams } from 'react-router-dom'

import { FontListSection } from '@/presentation/components/font/FontListSection'
import { useRecommendListViewModel } from '@/service/fonts/hooks/useRecommendListViewModel'
import type { FontItemModel } from '@/service/fonts/fontModel.type'

type RecommendFontSectionProps = Pick<FontItemModel, 'writerName'>

/** 제작자의 다른 폰트 추천 섹션 컴포넌트 */
export const RecommendFontSection = ({
  writerName,
}: RecommendFontSectionProps) => {
  const { fontId } = useParams<{ fontId: string }>()
  const recommendList = useRecommendListViewModel(Number(fontId))

  return (
    <section className='mt-20'>
      <h4 className='text-accent-light text-2xl leading-8 font-bold'>
        {writerName}님이 제작한 다른 폰트
      </h4>

      <FontListSection
        fontList={recommendList}
        emptyMessage='제작자의 생성한 다른 폰트가 존재하지 않습니다.'
      />
    </section>
  )
}
