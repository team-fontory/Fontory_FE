import { ROUTES } from '@/app/router/routes.constant'

/** 푸터에 표시되는 기본 텍스트 콘텐츠 */
export const FOOTER_CONTENT = {
  description: '나만의 글꼴을 쉽게 만들고 사용자 지정하세요.',
  technology: '이 서비스는 NAVER Corp.의 [DM-Font] 기술을 활용하고 있습니다.',
  contact: 'fontory@fontory.co.kr',
  copyright: '© 2025 Fontory. All Rights Reserved.',
} as const

/** 푸터에 표시되는 네비게이션 링크와 정책 링크 */
export const FOOTER_LINKS = {
  links: {
    title: 'LINKS',
    description: '사이트 네비게이션',
    items: [
      { label: '둘러보기', path: ROUTES.FONT.EXPLORE },
      { label: '폰트제작', path: ROUTES.FONT.CREATE },
      { label: '폰트합성', path: ROUTES.FONT.SYNTHESIZE },
    ],
  },
  policies: {
    title: 'POLICY',
    description: '약관 및 정책',
    items: [
      {
        label: '서비스 이용약관',
        path: import.meta.env.VITE_PUBLIC_SERVICE_TERM,
      },
      {
        label: '개인정보 처리방침',
        path: import.meta.env.VITE_PUBLIC_FONT_TERM,
      },
      {
        label: '폰트 공유약관',
        path: import.meta.env.VITE_PUBLIC_PRIVACY_TERM,
      },
    ],
  },
}
