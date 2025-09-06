import { type ReactNode } from 'react'

import { Footer } from './Footer'
import { Gnb } from './Gnb'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='bg-background flex min-h-svh flex-col'>
      <Gnb />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}
