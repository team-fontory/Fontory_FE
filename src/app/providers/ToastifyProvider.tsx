import type { PropsWithChildren } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

export const ToastifyProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ToastContainer
        position='top-right'
        closeButton
        autoClose={2000}
        closeOnClick
        pauseOnHover
        transition={Bounce}
        style={{ fontSize: '1rem' }}
      />
      {children}
    </>
  )
}
