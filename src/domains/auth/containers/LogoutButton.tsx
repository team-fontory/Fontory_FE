import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import { useLogoutMutation } from '@/domains/auth/services/useAuthMutation'

export const LogoutButton = () => {
  const { mutate: logout } = useLogoutMutation()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (confirm('로그아웃하시겠습니까?')) {
      logout()
      navigate(ROUTES.HOME)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className='text-accent hover:bg-secondary block w-full px-4 py-2 text-left text-sm'
    >
      로그아웃
    </button>
  )
}
