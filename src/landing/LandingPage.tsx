import { Gnb } from './Gnb'
import { HeroSection } from './HeroSection'

const LandingPage = () => {
  return (
    <>
      <Gnb />
      <main className='mx-auto max-w-[960px]'>
        <HeroSection />
      </main>
    </>
  )
}

export default LandingPage
