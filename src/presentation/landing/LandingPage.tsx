import { FinalCTASection } from './components/FinalCTASection'
import { HeroSection } from './components/HeroSection'
import { ServiceValueSection } from './components/ServiceValueSection'
import { TestimonialsSection } from './components/TestimonialsSection'

const LandingPage = () => {
  return (
    <main className='mx-auto max-w-[960px] py-16'>
      <HeroSection />
      <ServiceValueSection />
      <TestimonialsSection />
      <FinalCTASection />
    </main>
  )
}

export default LandingPage
