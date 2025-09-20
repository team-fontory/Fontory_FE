import type { FontListView } from '../types'

import { SelectableFontItem } from './SelectableFontItem'

type SynthesizeFontListProps = {
  listView: FontListView
}

export const SynthesizeFontList = ({ listView }: SynthesizeFontListProps) => {
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
        <SelectableFontItem key={font.fontId} {...font} />
      ))}
    </div>
  )
}
