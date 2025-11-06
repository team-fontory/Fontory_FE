import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'

import { Icon } from './Icon/Icon'

const NAV_ITEMS = [
  { label: '홈', path: ROUTES.HOME },
  { label: '둘러보기', path: ROUTES.FONT.EXPLORE },
  { label: '폰트제작', path: ROUTES.FONT.CREATE },
  { label: '폰트합성', path: ROUTES.FONT.SYNTHESIZE },
] as const

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const location = useLocation()

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-30 bg-transparent' onClick={onClose} />
      )}

      <div
        className={`absolute top-full left-0 z-40 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'block translate-y-0 opacity-100' : 'pointer-events-none hidden -translate-y-2 opacity-0'} `}
      >
        <div className='mx-auto max-w-screen-xl px-4 py-6'>
          <nav>
            <ul className='space-y-3'>
              {NAV_ITEMS.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className='block rounded-lg px-3 py-2 text-lg transition-colors hover:bg-gray-50'
                    aria-current={
                      location.pathname === path ? 'page' : undefined
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export const MobileMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <>
      <button
        onClick={toggleMenu}
        className='ml-4 rounded-lg p-2 hover:bg-gray-100 md:hidden'
        aria-label='메뉴 열기'
      >
        <Icon name='menu' size={20} />
      </button>

      <div className='md:hidden'>
        <MobileMenu isOpen={isOpen} onClose={closeMenu} />
      </div>
    </>
  )
}
