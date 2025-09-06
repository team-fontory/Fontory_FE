import { FontPreviewItem } from '../components/FontPreviewItem'
import type { FontListViewModel } from '../models/fontListViewModel'

type Props = {
  fontList: FontListViewModel
}

export const FontListSection = ({ fontList }: Props) => {
  if (!fontList) return null

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
