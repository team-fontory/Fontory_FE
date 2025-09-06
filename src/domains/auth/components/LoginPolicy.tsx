import { POLICY_LINKS } from '../constants/policy'

export const LoginPolicy = () => {
  return (
    <div className='text-footer-description mt-8 text-center text-xs leading-4 font-normal'>
      <p>이용 약관을 확인해주세요.</p>
      <ul className='flex-align-center mt-3 gap-3'>
        {POLICY_LINKS.map(({ label, envKey }) => {
          const url = import.meta.env[envKey]
          return (
            <li key={envKey}>
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
        })}
      </ul>
    </div>
  )
}
