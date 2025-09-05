import { FinalCTASection } from './FinalCTASection'
import { HeroSection } from './HeroSection'
import { ServiceValueSection } from './ServiceValueSection'
import { TestimonialsSection } from './TestimonialsSection'

const LandingPage = () => {
  return (
    <>
      <main className='mx-auto max-w-[960px] py-16'>
        <HeroSection />
        <ServiceValueSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
    </>
  )
}

export default LandingPage
