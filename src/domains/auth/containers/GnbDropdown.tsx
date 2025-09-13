import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import { PrimaryButton } from '@/shared/components/PrimaryButton'

import type { UserProfile } from '../types/auth.type'

import { DeleteUserButton } from './DeleteUserButton'
import { LogoutButton } from './LogoutButton'

type Props = Pick<UserProfile, 'nickname'>

export const GnbDropdown = ({ nickname }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='relative ml-8' ref={dropdownRef}>
      <PrimaryButton
        size='sm'
        secondary
        className='h-10'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {nickname} 님
      </PrimaryButton>

      {showDropdown && (
        <div className='border-secondary-point absolute top-full right-0 z-50 mt-2 w-48 rounded-md border bg-white shadow-lg'>
          <div className='py-1'>
            <Link
              to={ROUTES.MYPAGE.ACCOUNT}
              className='text-accent hover:bg-secondary block px-4 py-2 text-sm'
              onClick={() => setShowDropdown(false)}
            >
              프로필 수정
            </Link>
            <LogoutButton />
            <DeleteUserButton />
          </div>
        </div>
      )}
    </div>
  )
}
