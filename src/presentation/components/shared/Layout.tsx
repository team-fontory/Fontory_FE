import { type PropsWithChildren, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Footer } from './Footer'
import { Gnb } from './Gnb'

/** 전체 페이지 레이이웃 */
export const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  useLayoutEffect(() => window.scrollTo(0, 0), [location.pathname])

  return (
    <div className='bg-background flex min-h-svh flex-col'>
      <Gnb />
      <div className='mx-4 flex-1'>{children}</div>
      <Footer />
    </div>
  )
}
