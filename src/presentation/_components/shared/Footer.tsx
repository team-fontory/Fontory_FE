import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import { POLICY_LINKS } from '@/shared/constants/policy.constant'

import { Icon } from './Icon/Icon'

const FOOTER_CONTENT = {
  description: '나만의 글꼴을 쉽게 만들고 사용자 지정하세요.',
  technology: '이 서비스는 NAVER Corp.의 [DM-Font] 기술을 활용하고 있습니다.',
  contact: 'fontory@fontory.co.kr',
  copyright: '© 2025 Fontory. All Rights Reserved.',
} as const

const NAVIGATION_LINKS = [
  { label: '둘러보기', path: ROUTES.FONT.EXPLORE },
  { label: '폰트제작', path: ROUTES.FONT.CREATE },
  { label: '폰트합성', path: ROUTES.FONT.SYNTHESIZE },
] as const

const SiteInfoSection = () => {
  return (
    <div className='flex-column gap-4'>
      <Link to={ROUTES.HOME} className='mr-auto' aria-label='홈페이지로 이동'>
        <div className='font-jalnan flex-align-center gap-4 text-xl text-white'>
          <Icon size={24} name='logo' className='text-primary' />
          Fontory
        </div>
      </Link>
      <div className='text-footer-description'>
        <p className='mb-5 text-lg leading-6'>{FOOTER_CONTENT.description}</p>
        <p className='text-xs leading-5'>
          <a
            href='https://github.com/clovaai/dmfont'
            target='_blank'
            rel='noreferrer'
            aria-label='NAVER DM-Font 기술 사이트 (새 상에서 열림)'
          >
            {FOOTER_CONTENT.technology}
          </a>
        </p>
        <p className='text-xs leading-5'>문의: {FOOTER_CONTENT.contact}</p>
      </div>
    </div>
  )
}

const SiteNavigationSection = () => {
  return (
    <nav aria-label='사이트 네비게이션'>
      <h3 className='mb-4 text-center text-sm font-semibold text-white'>
        LINKS
      </h3>
      <ul className='flex-column text-footer-description items-center gap-3 text-sm'>
        {NAVIGATION_LINKS.map(({ label, path }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const PolicySection = () => {
  return (
    <nav aria-label='약관 및 정책'>
      <h3 className='mb-4 text-center text-sm font-semibold text-white'>
        POLICY
      </h3>
      <ul className='flex-column text-footer-description items-center gap-3 text-sm'>
        {POLICY_LINKS.map(({ label, envKey }) => (
          <li key={envKey}>
            <a href={import.meta.env[envKey]} target='_blank' rel='noreferrer'>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export const Footer = () => {
  return (
    <footer className='bg-accent px-10 py-8' aria-label='사이트 푸터'>
      <div
        className='flex-column mx-auto max-w-7xl gap-12'
        aria-label='사이트 푸터'
      >
        <div className='flex-between'>
          <SiteInfoSection />
          <div className='flex gap-10'>
            <SiteNavigationSection />
            <PolicySection />
          </div>
        </div>

        <div className='border-t-footer-description border-t pt-8'>
          <p className='text-footer-description text-center text-xs leading-5'>
            {FOOTER_CONTENT.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
