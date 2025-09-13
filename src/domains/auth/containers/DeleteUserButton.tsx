import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import { useDeleteUser } from '@/domains/auth/services/useAuthMutation'

export const DeleteUserButton = () => {
  const { mutate: deleteUser } = useDeleteUser()
  const navigate = useNavigate()

  const handleDeleteUser = () => {
    if (confirm('회원 탈퇴를 하시겠습니까?')) {
      deleteUser()
      navigate(ROUTES.HOME)
    }
  }

  return (
    <button
      onClick={handleDeleteUser}
      className='text-accent hover:bg-secondary block w-full px-4 py-2 text-left text-sm'
    >
      회원 탈퇴
    </button>
  )
}
