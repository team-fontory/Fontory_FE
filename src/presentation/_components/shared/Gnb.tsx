import { Link, useLocation } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import { useGnbStateQuery } from '@/store/queries/auth.query'

import { Icon } from './Icon/Icon'
import { GnbDropdown } from './GnbDropdown'
import { PrimaryButton } from './PrimaryButton'

const NAV_ITEMS = [
  { label: '홈', path: ROUTES.HOME },
  { label: '둘러보기', path: ROUTES.FONT.EXPLORE },
  { label: '폰트제작', path: ROUTES.FONT.CREATE },
  { label: '폰트합성', path: ROUTES.FONT.SYNTHESIZE },
] as const

const ActionButtonGroup = () => {
  const { data: gnbData, isError } = useGnbStateQuery()

  if (gnbData && !isError) return <GnbDropdown nickname={gnbData.nickname} />

  return (
    <div className='ml-8 hidden gap-2 md:flex'>
      <Link to={ROUTES.AUTH.LOGIN}>
        <PrimaryButton size='sm' className='h-10'>
          로그인 / 회원가입
        </PrimaryButton>
      </Link>
    </div>
  )
}

export const Gnb = () => {
  const location = useLocation()

  return (
    <nav
      className='flex-align-center sticky top-0 z-50 h-[73px] w-full bg-white px-10 py-4'
      aria-label='메인 네비게이션'
    >
      <Link to={ROUTES.HOME} className='mr-auto'>
        <h1 className='font-jalnan flex-align-center gap-4 text-xl'>
          <Icon size={24} name='logo' className='text-primary' />
          Fontory
        </h1>
      </Link>

      <ul className='flex-between-center hidden gap-9 md:flex'>
        {NAV_ITEMS.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className='hover:text-primary transition-colors'
              aria-current={location.pathname === path ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <ActionButtonGroup />
    </nav>
  )
}
