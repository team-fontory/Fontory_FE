import { type ReactNode } from 'react'

import { useScrollToTop } from '../hooks/useScrollToTop'

import { Footer } from './Footer'
import { Gnb } from './Gnb'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  useScrollToTop()

  return (
    <div className='bg-background flex min-h-svh flex-col'>
      <Gnb />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}
