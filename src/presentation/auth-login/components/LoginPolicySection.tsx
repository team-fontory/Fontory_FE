import {
  POLICY_LINKS,
  type PolicyLink,
} from '@/shared/constants/policy.constant'

/** 개별 정책 링크 라벨 컴포넌트 */
const PolicyLabel = ({ envKey, label }: Omit<PolicyLink, 'keyName'>) => {
  const url = import.meta.env[envKey]

  return (
    <li>
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
        className='text-primary font-medium'
        aria-label={`${label} (새 창에서 열림)`}
      >
        {label}
      </a>
    </li>
  )
}

/** 로그인 정책 섹션 컴포넌트 */
export const LoginPolicySection = () => {
  return (
    <section className='text-footer-description mt-8 text-center text-xs leading-4 font-normal'>
      <p>이용 약관을 확인해주세요.</p>
      <ul className='flex-align-center mt-3 gap-3'>
        {POLICY_LINKS.map(({ label, envKey, keyName }) => (
          <PolicyLabel key={keyName} envKey={envKey} label={label} />
        ))}
      </ul>
    </section>
  )
}
