import type { ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'

type Props = {
  step: number
  title: string
  description: string
  isActive?: boolean
  children: ReactNode
  className?: string
}

/** 폰트 생성 단계별 섹션 컴포넌트 */
export const CreateFontStepSection = ({
  step,
  title,
  description,
  isActive = true,
  children,
  className,
}: Props) => {
  return (
    <section
      className={cn('flex-column border-secondary gap-4 rounded-lg border bg-white p-8', className)}
    >
      <div className='flex-align-center gap-4'>
        <div
          className={cn(
            'flex-center size-8 rounded-full text-xl leading-8 font-bold text-white',
            isActive ? 'bg-primary' : 'bg-secondary-point text-accent-light',
          )}
        >
          {step}
        </div>
        <p className='text-accent text-2xl leading-8 font-bold'>{title}</p>
      </div>
      <p className='text-description text-base leading-6 font-normal'>{description}</p>
      {children}
    </section>
  )
}
