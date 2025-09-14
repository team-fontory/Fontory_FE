import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 페이지 이동 시 스크롤을 맨 위로 이동시키는 훅
 */
export const useScrollToTop = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
}
