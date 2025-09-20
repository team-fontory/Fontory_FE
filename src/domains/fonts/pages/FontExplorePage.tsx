import { Pagination } from '@/shared/components/Pagination'

import { FontFilter } from '../containers/FontFilter'
import { FontListSection } from '../containers/FontListSection'
import { PopularFontSection } from '../containers/PopularFontSection'
import { useExplorePageState } from '../hooks/useExplorePageState'

const FontExplorePage = () => {
  const { currentPage, listView, paginationView } = useExplorePageState()

  return (
    <>
      <main className='mx-auto my-10 max-w-5xl px-4'>
        <h1 className='font-jalnan p-4 text-3xl leading-9 font-bold'>폰트 둘러보기</h1>
        <PopularFontSection />

        <section className='mt-12' aria-labelledby='all-fonts-title'>
          <h2 id='all-fonts-title' className='px-4 py-5 text-2xl leading-8 font-bold'>
            전체 폰트
          </h2>
          <FontFilter />
          <FontListSection listView={listView} />

          <div className='pb-8'>
            <Pagination
              currentPage={currentPage}
              totalPages={paginationView.totalPages}
              className='mt-8'
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default FontExplorePage
