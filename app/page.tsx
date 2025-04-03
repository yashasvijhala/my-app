import CareersSection from '@/components/careers-section'
import StepsAnimation from '@/components/steps-animation'
import AboutSection from '../components/about-section'
import ContactSection from '../components/contact-section'
import HeroSection from '../components/hero-section'
import Layout from '../components/layout'
import ServicesSection from '../components/services-section'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <StepsAnimation />
      <ServicesSection />
      <AboutSection />
      <CareersSection />
      <ContactSection />
    </Layout>
  )
}
