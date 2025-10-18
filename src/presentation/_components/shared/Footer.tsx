import { Link } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import {
  FOOTER_CONTENT,
  FOOTER_LINKS,
} from '@/shared/constants/footer.constant'

import { Icon } from './Icon/Icon'

/** 사이트 로고, 설명, 연락처 정보를 표시하는 섹션 */
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
            aria-label='NAVER DM-Font 기술 사이트 (새 창에서 열림)'
          >
            {FOOTER_CONTENT.technology}
          </a>
        </p>
        <p className='text-xs leading-5'>문의: {FOOTER_CONTENT.contact}</p>
      </div>
    </div>
  )
}

/** 사이트 내 주요 페이지 링크를 표시하는 네비게이션 섹션 */
const SiteNavigationSection = () => {
  return (
    <nav aria-label={FOOTER_LINKS.links.description}>
      <h3 className='mb-4 text-center text-sm font-semibold text-white'>
        {FOOTER_LINKS.links.title}
      </h3>
      <ul className='flex-column text-footer-description items-center gap-3 text-sm'>
        {FOOTER_LINKS.links.items.map(({ label, path }) => (
          <li key={path}>
            <Link to={path}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** 이용약관, 개인정보처리방침 등 정책 관련 링크를 표시하는 섹션 */
const PolicySection = () => {
  return (
    <nav aria-label={FOOTER_LINKS.policies.description}>
      <h3 className='mb-4 text-center text-sm font-semibold text-white'>
        {FOOTER_LINKS.policies.title}
      </h3>
      <ul className='flex-column text-footer-description items-center gap-3 text-sm'>
        {FOOTER_LINKS.policies.items.map(({ label, path }) => (
          <li key={label}>
            <a href={path} target='_blank' rel='noreferrer'>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** 사이트 정보, 링크, 저작권 정보를 포함한 메인 푸터 컴포넌트 */
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
