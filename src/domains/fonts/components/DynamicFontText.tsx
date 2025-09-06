import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import { useDynamicFont } from '../hooks/useDynamicFont'

type Props = {
  fontName: string
  fontUrl: string
  children: ReactNode
  className?: string
  skeletonClassName?: string
  style?: CSSProperties
} & HTMLAttributes<HTMLElement>

/** 폰트 로딩 상태를 처리하는 텍스트 컴포넌트 */
export const DynamicFontText = ({
  fontName,
  fontUrl,
  children,
  className = '',
  skeletonClassName = 'bg-secondary h-6 w-full animate-pulse rounded',
  style,
  ...props
}: Props) => {
  const { fontFamily, isLoaded } = useDynamicFont({ fontName, fontUrl })

  if (!isLoaded) {
    return <div className={skeletonClassName} />
  }

  return (
    <div className={className} style={{ fontFamily, ...style }} {...props}>
      {children}
    </div>
  )
}
