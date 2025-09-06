import type { TextareaHTMLAttributes } from 'react'

import { useDynamicFont } from '../hooks/useDynamicFont'

type Props = {
  fontName: string
  fontUrl: string
  skeletonClassName?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

/** 폰트 로딩 상태를 처리하는 textarea 컴포넌트 */
export const DynamicFontTextarea = ({
  fontName,
  fontUrl,
  skeletonClassName = 'bg-secondary mb-16 h-8 w-full animate-pulse rounded',
  style,
  ...props
}: Props) => {
  const { fontFamily, isLoaded } = useDynamicFont({ fontName, fontUrl })

  if (!isLoaded) {
    return <div className={skeletonClassName} />
  }

  return <textarea style={{ fontFamily, ...style }} {...props} />
}
