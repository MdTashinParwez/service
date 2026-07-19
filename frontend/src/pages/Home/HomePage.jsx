import React from 'react'
import HeroSection from '../../components/home/HeroSection'
import CategoriesSection from '../../components/home/CategoriesSection'
import TopProvidersSection from '../../components/home/TopProvidersSection'
import HowItWorksSection from '../../components/home/HowItWorksSection'
import WhyChooseUsSection from '../../components/home/WhyChooseUsSection'
import TestimonialsSection from '../../components/home/TestimonialsSection'
import CTASection from '../../components/home/CTASection'
import FAQSection from '../../components/home/FAQSection'
import StatsSection from '../../components/home/StatsSection'

function HomePage() {
  return (
    <div>
      <HeroSection/>
      <StatsSection/>
      <CategoriesSection/>
      <TopProvidersSection/>
      <HowItWorksSection/>
      <WhyChooseUsSection/>
      <TestimonialsSection/>
      <CTASection/>
      <FAQSection/>
  
    </div>
  )
}

export default HomePage
