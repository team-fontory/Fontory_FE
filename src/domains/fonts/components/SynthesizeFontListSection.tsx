import type { FontItemView, FontListView } from '../types/font.type'

import { SelectableFontItem } from './SelectableFontItem'

type Props = {
  listView: FontListView
  onFontSelect?: (font: FontItemView) => void
  selectedFontIds?: number[]
}

export const SynthesizeFontListSection = ({
  listView,
  onFontSelect,
  selectedFontIds = [],
}: Props) => {
  if (listView.isEmpty)
    return (
      <div id='font-list' className='flex-column py-6' role='tabpanel'>
        <div className='flex-center text-description py-20'>
          <p>검색 결과가 없습니다.</p>
        </div>
      </div>
    )

  return (
    <div id='font-list' className='flex-column py-6' role='tabpanel'>
      {listView.list.map((font) => (
        <SelectableFontItem
          key={font.fontId}
          {...font}
          onSelect={onFontSelect}
          isSelected={selectedFontIds.includes(font.fontId)}
          isSelectable={!!onFontSelect}
        />
      ))}
    </div>
  )
}
