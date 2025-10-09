import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import { PrimaryButton } from '@/presentation/components/shared/PrimaryButton'

/** 최종 CTA 섹션에 사용될 고정 컨텐츠 */
const CTA_CONTENT = {
  title: '나만의 폰트를 만들어볼 준비 되셨나요?',
  buttonText: '지금 바로 제작하기',
} as const

/** 최종 CTA 섹션 컴포넌트 */
export const FinalCTASection = () => {
  const navigate = useNavigate()

  const handleStartCreating = () => {
    navigate(ROUTES.FONT.CREATE)
  }

  return (
    <section
      className='flex-column bg-secondary items-center gap-6 rounded-xl py-20'
      aria-labelledby='final-cta-title'
      role='banner'
    >
      <h2
        id='final-cta-title'
        className='font-jalnan text-accent text-center text-2xl leading-11'
      >
        {CTA_CONTENT.title}
      </h2>
      <PrimaryButton
        size='md'
        onClick={handleStartCreating}
        aria-describedby='final-cta-title'
      >
        {CTA_CONTENT.buttonText}
      </PrimaryButton>
    </section>
  )
}
