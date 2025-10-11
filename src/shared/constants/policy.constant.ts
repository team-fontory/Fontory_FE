export type PolicyLink = {
  label: string
  envKey: string
  keyName: 'serviceTerms' | 'privacyTerms' | 'fontTerms'
}

export const POLICY_LINKS: readonly PolicyLink[] = [
  { label: '서비스 이용약관', envKey: 'VITE_PUBLIC_SERVICE_TERM', keyName: 'serviceTerms' },
  { label: '개인정보 처리방침', envKey: 'VITE_PUBLIC_FONT_TERM', keyName: 'privacyTerms' },
  { label: '폰트 공유약관', envKey: 'VITE_PUBLIC_PRIVACY_TERM', keyName: 'fontTerms' },
] as const
