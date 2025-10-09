import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import {
  useDeleteUserMutation,
  useLogoutMutation,
} from '@/store/queries/auth.mutation'

import { PrimaryButton } from '../shared/PrimaryButton'

type AuthActionButtonProps = {
  label: string
  onClick: () => void
}

const AuthActionButton = ({ label, onClick }: AuthActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='text-accent hover:bg-secondary block w-full px-4 py-2 text-left text-sm'
    >
      {label}
    </button>
  )
}

type DropDownItemProps = {
  link: string
  label: string
}

const DropDownItem = ({ link, label }: DropDownItemProps) => {
  return (
    <Link
      to={link}
      className='text-accent hover:bg-secondary block px-4 py-2 text-sm'
    >
      {label}
    </Link>
  )
}

type GnbDropdownProps = {
  nickname: string
}

export const GnbDropdown = ({ nickname }: GnbDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { mutate: deleteUser } = useDeleteUserMutation()
  const { mutate: logout } = useLogoutMutation()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (confirm('로그아웃하시겠습니까?')) {
      navigate(ROUTES.HOME)
      logout()
    }
  }

  const handleDeleteUser = () => {
    if (confirm('회원 탈퇴를 하시겠습니까?')) {
      navigate(ROUTES.HOME)
      deleteUser()
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const isDropdownOpen =
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)

      if (isDropdownOpen) {
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
            <DropDownItem link={ROUTES.MYPAGE.ACCOUNT} label='프로필 수정' />
            <DropDownItem
              link={ROUTES.MYPAGE.MY_FONT}
              label='내가 제작한 폰트'
            />
            <DropDownItem link={ROUTES.MYPAGE.BOOKMARK} label='북마크한 폰트' />
            <AuthActionButton label='로그아웃' onClick={handleLogout} />
            <AuthActionButton label='회원탈퇴' onClick={handleDeleteUser} />
          </div>
        </div>
      )}
    </div>
  )
}
