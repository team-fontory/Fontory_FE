import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes.constant'
import { PrimaryButton } from '@/presentation/_components/shared/PrimaryButton'
import { HERO_CONTENT } from '@/shared/constants/landing.constant'

/** 히어로 섹션 컴포넌트 */
export const HeroSection = () => {
  const navigate = useNavigate()

  const handleStartCreating = () => {
    navigate(ROUTES.FONT.CREATE)
  }

  return (
    <section
      className='flex-column shadow-hero relative min-h-[520px] items-center justify-center gap-6 p-10 px-4 text-white'
      aria-labelledby='hero-title'
    >
      <div className='absolute inset-0 overflow-hidden rounded-xl'>
        <img
          src='/images/hero.svg'
          alt=''
          className='h-full w-full object-cover'
        />
      </div>

      <h2 id='hero-title' className='font-jalnan z-10 text-center text-3xl'>
        {HERO_CONTENT.title}
      </h2>

      <p className='z-10 text-center text-xl leading-7 font-light'>
        {HERO_CONTENT.description.line1}
        <br />
        {HERO_CONTENT.description.line2}
      </p>

      <PrimaryButton
        size='md'
        className='z-10 h-12 w-fit px-8'
        onClick={handleStartCreating}
        aria-describedby='hero-title'
      >
        {HERO_CONTENT.buttonText}
      </PrimaryButton>
    </section>
  )
}
