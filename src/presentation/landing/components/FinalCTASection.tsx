import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import { PrimaryButton } from '@/presentation/_components/shared/PrimaryButton'
import { CTA_CONTENT } from '@/shared/constants/landing.constant'

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
