import { Gnb } from './Gnb'
import { HeroSection } from './HeroSection'
import { ServiceValueSection } from './ServiceValueSection'

const LandingPage = () => {
  return (
    <>
      <Gnb />
      <main className='mx-auto max-w-[960px]'>
        <HeroSection />
        <ServiceValueSection />
      </main>
    </>
  )
}

export default LandingPage
