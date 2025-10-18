import { createContext, useContext } from 'react'
import type {
  HTMLAttributes,
  PropsWithChildren,
  TextareaHTMLAttributes,
} from 'react'

import { useDynamicFont } from '@/service/fonts/hooks/useDynamicFont'
import { cn } from '@/shared/utils/cn'

type DynamicFontContextValue = {
  fontFamily: string
  isLoaded: boolean
}

const DynamicFontContext = createContext<DynamicFontContextValue | null>(null)

const useDynamicFontContext = () => {
  const context = useContext(DynamicFontContext)
  if (!context) {
    throw new Error('DynamicFont 컴포넌트는 Root 내부에서 사용해야 합니다.')
  }

  return context
}

type RootProps = {
  fontName: string
  fontUrl: string
}

const Root = ({
  fontName,
  fontUrl,
  children,
}: PropsWithChildren<RootProps>) => {
  const { fontFamily, isLoaded } = useDynamicFont(fontName, fontUrl)

  return (
    <DynamicFontContext.Provider value={{ fontFamily, isLoaded }}>
      {children}
    </DynamicFontContext.Provider>
  )
}

const Text = ({
  children,
  className,
  style,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const { fontFamily, isLoaded } = useDynamicFontContext()

  if (!isLoaded) {
    return null
  }

  return (
    <div
      className={cn('text-accent font-medium', className)}
      style={{ fontFamily, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

const Textarea = ({
  style,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const { fontFamily, isLoaded } = useDynamicFontContext()

  if (!isLoaded) {
    return null
  }

  return (
    <textarea
      style={{ fontFamily, ...style }}
      className={cn(
        'text-accent w-full resize-none text-3xl leading-10 font-normal',
        className,
      )}
      {...props}
    />
  )
}

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { isLoaded } = useDynamicFontContext()

  if (isLoaded) {
    return null
  }

  return (
    <div
      className={cn('bg-secondary animate-pulse rounded', className)}
      {...props}
    />
  )
}

export const DynamicFont = Object.assign(Root, {
  Text,
  Textarea,
  Skeleton,
})
