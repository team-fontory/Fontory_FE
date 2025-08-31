import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import { cn } from '../utils/cn'

type Size = 'sm' | 'md'

type Props = {
  children: ReactNode
  secondary?: boolean
  size: Size
  loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const SIZE_BUTTON_CLASSES: Record<Size, string> = {
  sm: 'text-sm leading-[21px] px-4',
  md: 'text-base leading-6 px-4 pt-[11.5px] pb-[12.5px]',
}

const VARIANT_BUTTON_CLASSES = {
  primary:
    'bg-primary text-white hover:bg-primary-point hover:text-white focus:bg-secondary focus:text-accent',
  secondary:
    'bg-secondary text-accent hover:bg-secondary-point hover:text-accent focus:bg-secondary-point focus:text-accent',
} as const

const DISABLED_BUTTON_CLASSES = 'bg-disabled text-white cursor-not-allowed'

/** 주요 액션을 위한 버튼 컴포넌트 */
export const PrimaryButton = ({
  children,
  className,
  disabled,
  loading = false,
  secondary = false,
  size,
  type = 'button',
  ...props
}: Props) => {
  const variant = secondary ? 'secondary' : 'primary'
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      className={cn(
        'flex-align-center rounded-md font-bold transition-all',
        SIZE_BUTTON_CLASSES[size],
        isDisabled ? DISABLED_BUTTON_CLASSES : VARIANT_BUTTON_CLASSES[variant],
        className,
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  )
}
