import { EmptyFontListMessage } from '@/presentation/components/font/EmptyFontListMessage'
import { FontSearchBar } from '@/presentation/components/font/FontSearchBar'
import { Pagination } from '@/presentation/components/shared/Pagination'
import { useBookmarkFontListViewModel } from '@/service/fonts/hooks/useBookmarkFontListViewModel'
import type { FontListModel } from '@/service/fonts/types/fontModel.type'

import { SelectableFontItem } from './SelectableFontItem'

type BookmarkFontListProps = {
  fontList: FontListModel
}

/** 북마크된 폰트 목록 컴포넌트 */
const BookmarkFontList = ({ fontList }: BookmarkFontListProps) => {
  if (!fontList.length) {
    return <EmptyFontListMessage message='북마크한 폰트가 존재하지 않습니다.' />
  }

  return (
    <div id='font-list' className='flex-column py-6' role='tabpanel'>
      {fontList.map((font) => (
        <SelectableFontItem key={font.fontId} {...font} />
      ))}
    </div>
  )
}

/** 북마크된 폰트 목록 섹션 컴포넌트 */
export const BookmarkFontListSection = () => {
  const { fontList, totalPages } = useBookmarkFontListViewModel()

  return (
    <section className='mt-12' aria-labelledby='bookmark-fonts-title'>
      <h2 className='text-accent py-5 text-2xl leading-8 font-bold'>
        북마크한 폰트
      </h2>
      <FontSearchBar />
      <BookmarkFontList fontList={fontList} />
      <Pagination totalPages={totalPages} className='my-8' />
    </section>
  )
}
