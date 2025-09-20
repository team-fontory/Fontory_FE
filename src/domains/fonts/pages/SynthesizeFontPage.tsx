import { useState } from 'react'

import { Pagination } from '@/shared/components/Pagination'
import { PrimaryButton } from '@/shared/components/PrimaryButton'

import { SelectedFontCard } from '../components/SelectedFontCard'
import { SynthesizeFontListSection } from '../components/SynthesizeFontListSection'
import { FontSearchBar } from '../containers/FontSearchBar'
import { useBookmarkFontList } from '../services/useFontQuery'
import type { FontItemView } from '../types/font.type'

const SynthesizeFontPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFonts, setSelectedFonts] = useState<FontItemView[]>([])

  const {
    data: { listView, paginationView },
    refetch,
  } = useBookmarkFontList({
    page: currentPage,
    keyword: searchQuery.trim() || null,
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setCurrentPage(1)
    refetch()
  }

  const handleFontSelect = (font: FontItemView) => {
    if (selectedFonts.length < 2 && !selectedFonts.find((f) => f.fontId === font.fontId)) {
      setSelectedFonts([...selectedFonts, font])
    }
  }

  const handleFontRemove = (fontId: number) => {
    setSelectedFonts(selectedFonts.filter((f) => f.fontId !== fontId))
  }

  const handleSynthesize = async () => {
    if (selectedFonts.length !== 2) return

    // TODO: 실제 합성 API 호출
  }

  return (
    <main className='mx-auto my-10 max-w-5xl px-4'>
      <header className='flex-column mb-8 items-center gap-4'>
        <h1 className='font-jalnan text-accent-light text-4xl'>폰트 합성</h1>
        <p className='text-description text-center text-lg leading-7 font-normal'>
          북마크한 폰트 중에서 두 개를 선택하여 새로운 폰트를 만들어보세요.
        </p>
      </header>

      <section className='mb-8'>
        <h2 className='text-accent mb-4 text-2xl font-bold'>
          선택된 폰트 ({selectedFonts.length}/2)
        </h2>
        <div className='border-secondary-point relative grid h-[168px] grid-cols-2 gap-4 rounded-lg border-2 border-dashed p-5'>
          {selectedFonts.length ? (
            selectedFonts.map((font) => (
              <SelectedFontCard
                key={font.fontId}
                font={font}
                onRemove={() => handleFontRemove(font.fontId)}
              />
            ))
          ) : (
            <p className='text-footer-description text-md absolute top-1/2 left-1/2 w-fit -translate-1/2 text-center font-normal'>
              아래에서 폰트를 선택해주세요.
            </p>
          )}
        </div>

        <PrimaryButton
          onClick={handleSynthesize}
          size='md'
          className='mt-4 ml-auto'
          disabled={selectedFonts.length !== 2}
        >
          폰트 합성하기
        </PrimaryButton>
      </section>

      <section className='mt-12' aria-labelledby='bookmark-fonts-title'>
        <h2 className='text-accent py-5 text-2xl leading-8 font-bold'>북마크한 폰트</h2>

        <FontSearchBar searchQuery={searchQuery} onSearch={handleSearchChange} />
        <button
          type='button'
          className='text-footer-description mt-2 mr-1 ml-auto block'
          onClick={handleResetFilters}
        >
          검색어 초기화
        </button>

        <SynthesizeFontListSection
          listView={listView}
          onFontSelect={selectedFonts.length < 2 ? handleFontSelect : undefined}
          selectedFontIds={selectedFonts.map((f) => f.fontId)}
        />

        {!paginationView.isOnlyOnePage && (
          <div className='pb-8'>
            <Pagination
              currentPage={currentPage}
              totalPages={paginationView.totalPages}
              onPageChange={handlePageChange}
              className='mt-8'
            />
          </div>
        )}
      </section>
    </main>
  )
}

export default SynthesizeFontPage
