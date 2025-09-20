import { FontPreviewItem } from '../components/FontPreviewItem'
import type { FontListView } from '../types'

type FontListSectionProps = {
  listView: FontListView
}

export const FontListSection = ({ listView }: FontListSectionProps) => {
  if (listView.isEmpty)
    return (
      <div id='font-list' className='flex-column px-4 py-6' role='tabpanel'>
        <div className='flex-center text-description py-20'>
          <p>검색 결과가 없습니다.</p>
        </div>
      </div>
    )

  return (
    <div id='font-list' className='flex-column px-4 py-6' role='tabpanel'>
      {listView.list.map((font) => (
        <FontPreviewItem key={font.fontId} {...font} />
      ))}
    </div>
  )
}
