import { FontPreviewItem } from '../components/FontPreviewItem'
import { useExploreFontList } from '../services/useFontQuery'
import type { FontFilterType } from '../types/font.type'
import { getFilterSortBy } from '../utils/getFilterSortBy'

type Props = {
  activeFilter: FontFilterType
}

export const FontExploreList = ({ activeFilter }: Props) => {
  const { data: fontList } = useExploreFontList({
    page: 1,
    sortBy: getFilterSortBy(activeFilter),
    keyword: null,
  })

  return (
    <div id='font-list' className='flex-column px-4 py-6' role='tabpanel'>
      {fontList.isEmpty ? (
        <div className='flex-center text-description py-20'>
          <p>검색 결과가 없습니다.</p>
        </div>
      ) : (
        fontList.fontList.map((font) => <FontPreviewItem key={font.fontId} {...font.toData()} />)
      )}
    </div>
  )
}
