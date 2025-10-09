import { FontItem } from '@/presentation/components/font/FontItem'
import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'
import type { FontItemModel } from '@/service/fonts/fontModel.type'
import {
  useCanAddFont,
  useIsFontSelected,
  useSelectedFontListActions,
} from '@/store/states/selectedFontList.store'

export const SelectableFontItem = (fontData: FontItemModel) => {
  const { fontId, fontName, example, writerName, fontAddr } = fontData

  const isSelected = useIsFontSelected(fontId)
  const isSelectable = useCanAddFont(fontId)
  const showSelectButton = isSelectable || isSelected

  const { addFont } = useSelectedFontListActions()

  const handleSelect = () => {
    if (isSelectable) {
      addFont(fontData)
    }
  }

  return (
    <FontItem selected={isSelected}>
      <FontItem.Info fontId={fontId} fontName={fontName}>
        <div className='flex-column gap-2'>
          <FontItem.Preview
            fontName={fontName}
            fontAddr={fontAddr}
            example={example}
          />
          <FontItem.Meta fontName={fontName} writerName={writerName} />
        </div>
      </FontItem.Info>

      <FontItem.Actions>
        {showSelectButton && (
          <PrimaryButton
            size='sm'
            onClick={handleSelect}
            disabled={isSelected || !isSelectable}
            secondary={!isSelected}
            className='px-3 py-1'
          >
            {isSelected ? '선택됨' : '선택'}
          </PrimaryButton>
        )}
      </FontItem.Actions>
    </FontItem>
  )
}
