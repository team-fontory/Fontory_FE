import { useFormContext } from 'react-hook-form'

import {
  POLICY_LINKS,
  type PolicyLink,
} from '@/shared/constants/policy.constant'

/** 개별 정책 링크 라벨 컴포넌트 */
const PolicyLabel = ({ envKey, label, keyName }: PolicyLink) => {
  const { register } = useFormContext()
  const url = import.meta.env[envKey]

  return (
    <li className='flex gap-2'>
      <label className='flex-align-center grow cursor-pointer gap-2'>
        <input
          type='checkbox'
          {...register(keyName)}
          className='accent-primary'
        />
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
}

/** 회원가입 정책 섹션 컴포넌트 */
export const SignupPolicy = () => {
  return (
    <ul className='flex-column mb-8 gap-3'>
      {POLICY_LINKS.map(({ label, envKey, keyName }) => (
        <PolicyLabel
          key={keyName}
          label={label}
          envKey={envKey}
          keyName={keyName}
        />
      ))}
    </ul>
  )
}
