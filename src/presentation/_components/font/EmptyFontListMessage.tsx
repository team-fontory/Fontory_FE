import { cn } from '@/shared/utils/cn'

type EmptyFontListMessageProps = {
  message: string
  className?: string
}

/** 폰트 목록이 빈 배열일 때의 메시지 표시 컴포넌트 */
export const EmptyFontListMessage = ({
  message,
  className,
}: EmptyFontListMessageProps) => {
  return (
    <div
      id='font-list'
      className={cn('flex-column py-6', className)}
      role='tabpanel'
    >
      <div className='flex-center text-description py-20'>
        <p>{message}</p>
      </div>
    </div>
  )
}
