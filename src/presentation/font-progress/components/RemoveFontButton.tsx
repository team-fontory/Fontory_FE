import { Icon } from '@/presentation/_components/shared/Icon/Icon'
import { useRemoveFont } from '@/service/fonts/hooks/useRemoveFont'

type DeleteButtonProps = {
  fontName: string
  fontId: number
}

export const RemoveFontButton = ({ fontName, fontId }: DeleteButtonProps) => {
  const { handleRemoveFont } = useRemoveFont({ fontId })

  return (
    <button
      onClick={handleRemoveFont}
      className='flex-align-center bg-error text-secondary hover:bg-error-point gap-1 rounded-md px-3 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50'
      aria-label={`${fontName} 제거`}
    >
      <Icon name='trash' size={16} />
      폰트 제거
    </button>
  )
}
