import { Gnb } from './Gnb'
import { HeroSection } from './HeroSection'
import { ServiceValueSection } from './ServiceValueSection'
import { TestimonialsSection } from './TestimonialsSection'

const LandingPage = () => {
  return (
    <>
      <Gnb />
      <main className='mx-auto max-w-[960px]'>
        <HeroSection />
        <ServiceValueSection />
        <TestimonialsSection />
      </main>
    </>
  )
}

export default LandingPage
