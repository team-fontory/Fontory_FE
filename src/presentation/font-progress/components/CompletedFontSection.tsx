import { FontListSection } from '@/presentation/components/font/FontListSection'
import { Pagination } from '@/presentation/components/shared/Pagination'
import { useCompletedFontListViewModel } from '@/service/fonts/view-models/useCompletedFontListViewModel'

export const CompletedFontSection = () => {
  const { fontList, totalPages } = useCompletedFontListViewModel()

  return (
    <section className='flex-column gap-4'>
      <h3 className='text-accent-light text-2xl leading-8 font-bold'>
        제작 완료된 폰트
      </h3>
      <FontListSection
        fontList={fontList}
        emptyMessage='제작이 완료된 폰트가 없습니다.'
      />
      <Pagination totalPages={totalPages} showPages={5} className='mt-6' />
    </section>
  )
}
