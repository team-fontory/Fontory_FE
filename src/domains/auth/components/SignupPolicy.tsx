import { useFormContext } from 'react-hook-form'

import { POLICY_LINKS } from '../constants/policy'

export const SignupPolicy = () => {
  const { register } = useFormContext()
  return (
    <ul className='flex-column mb-8 gap-3'>
      {POLICY_LINKS.map(({ label, envKey, key }) => {
        const url = import.meta.env[envKey]
        return (
          <li key={envKey} className='flex gap-2'>
            <label className='flex-align-center grow cursor-pointer gap-2'>
              <input type='checkbox' {...register(key)} className='accent-primary' />
              <span className='text-sm'>{label}에 동의합니다</span>
            </label>
            <a
              href={url}
              target='_blank'
              rel='noreferrer'
              className='text-primary text-xs font-medium'
              aria-label={`${label} (새 창에서 열림)`}
            >
              약관 보기
            </a>
          </li>
        )
      })}
    </ul>
  )
}
