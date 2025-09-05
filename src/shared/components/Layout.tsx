import { type ReactNode } from 'react'

import { Footer } from './Footer'
import { Gnb } from './Gnb'

type Props = {
  children: ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className='bg-background min-h-svh'>
      <Gnb />
      {children}
      <Footer />
    </div>
  )
}
