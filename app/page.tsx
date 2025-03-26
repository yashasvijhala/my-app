import CareersSection from '@/components/careers-section'
import AboutSection from '../components/about-section'
import ContactSection from '../components/contact-section'
import HeroSection from '../components/hero-section'
import Layout from '../components/layout'
import ServicesSection from '../components/services-section'

export default function Home() {
  return (
    <Layout>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <CareersSection />
        <ContactSection />
      </div>
    </Layout>
  )
}
