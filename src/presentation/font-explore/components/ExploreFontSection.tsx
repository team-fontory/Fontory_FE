import { useSearchParams } from 'react-router-dom'

import { FontListSection } from '@/presentation/_components/font/FontListSection'
import { FontSearchBar } from '@/presentation/_components/font/FontSearchBar'
import { PageLoader } from '@/presentation/_components/shared/PageLoader'
import { Pagination } from '@/presentation/_components/shared/Pagination'
import {
  FONT_FILTER_OPTIONS,
  type FontFilterKeyType,
} from '@/service/fonts/constants/filter.constant'
import { useExploreFontListViewModel } from '@/service/fonts/view-models/useExploreFontListViewModel'

import { FilterButton } from './FilterButton'

/** 주어진 이전 URLSearchParams와 선택된 필터 키로 새로운 쿼리 파라미터 생성 */
const updateFilterParam = (
  prev: URLSearchParams,
  filter: FontFilterKeyType,
) => {
  const newParams = new URLSearchParams(prev)

  if (filter === FONT_FILTER_OPTIONS[0].key) {
    newParams.delete('filter')
  } else {
    newParams.set('filter', filter)
  }

  newParams.delete('page')

  return newParams
}

/** URL의 filter 쿼리 파라미터 값으로부터 실제 필터 옵션 객체 찾기 */
const findSelectedFilter = (filter: string) => {
  const selectedFilter = FONT_FILTER_OPTIONS.find(
    (option) => option.key === filter,
  )

  return selectedFilter || FONT_FILTER_OPTIONS[0]
}

/** 필터 버튼들의 리스트를 렌더링하는 컴포넌트 */
const FontFilterList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = findSelectedFilter(searchParams.get('filter') || '')

  const isActive = (filterKey: FontFilterKeyType) =>
    activeFilter.key === filterKey

  const onClickFilterButton = (filterKey: FontFilterKeyType) =>
    setSearchParams((prev) => updateFilterParam(prev, filterKey))

  return (
    <div className='flex min-w-max gap-2'>
      {FONT_FILTER_OPTIONS.map(({ key: filterKey, label, description }) => (
        <FilterButton
          key={filterKey}
          filterKey={filterKey}
          isActive={isActive(filterKey)}
          label={label}
          description={description}
          onClick={() => onClickFilterButton(filterKey)}
        />
      ))}
    </div>
  )
}

/** 전체 폰트 목록과 필터링, 페이지네이션을 포함한 섹션 컴포넌트 */
export const ExploreFontSection = () => {
  const { isLoading, fontList, totalPages } = useExploreFontListViewModel()
  if (isLoading) return <PageLoader />

  return (
    <section className='mt-12' aria-labelledby='all-fonts-title'>
      <h2 id='all-fonts-title' className='py-5 text-2xl leading-8 font-bold'>
        전체 폰트
      </h2>
      <nav
        className='flex-column gap-4 overflow-x-auto'
        role='tablist'
        aria-label='폰트 필터 옵션'
      >
        <FontFilterList />
        <FontSearchBar />
      </nav>
      <FontListSection
        fontList={fontList}
        emptyMessage='등록된 폰트가 존재하지 않습니다.'
      />
      <Pagination totalPages={totalPages} className='my-8' />
    </section>
  )
}
