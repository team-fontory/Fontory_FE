import { Footer } from '@/shared/components/Footer'

import { Gnb } from '../shared/components/Gnb'

import { FinalCTASection } from './FinalCTASection'
import { HeroSection } from './HeroSection'
import { ServiceValueSection } from './ServiceValueSection'
import { TestimonialsSection } from './TestimonialsSection'

const LandingPage = () => {
  return (
    <>
      <Gnb />
      <main className='mx-auto max-w-[960px] py-16'>
        <HeroSection />
        <ServiceValueSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
