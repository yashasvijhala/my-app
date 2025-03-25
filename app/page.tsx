import CareersSection from '@/components/careers-section'
import AboutSection from '../components/about-section'
import ContactSection from '../components/contact-section'
import HeroSection from '../components/hero-section'
import Layout from '../components/layout'
import ServicesSection from '../components/services-section'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CareersSection />
      <ContactSection />
    </Layout>
  )
}
