import React from 'react'
import MarqueeData from '../components/MarqueeData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Gifts from '../components/Gifts'
import Offers from '../components/Offers'
import ExtraSection from '../components/ExtraSection'
import Videos from '../components/Videos'
import ExtraSection2 from '../components/ExtraSection2'
import MarsParty from '../components/MarsParty'
import Slider from '../components/Slider'
import ProductSection from '../components/ProductSection'
import BestSellers from '../components/BestSellers'
import StickyHeader from '@/components/StickyHeader'

const Home = () => {
  return (
    <div>
        {/* <MarqueeData />
        <Navbar /> */}
        <StickyHeader />
        <ProductSection />
        <Slider />
        <BestSellers />
        <Gifts />
        <Offers />
        <ExtraSection />
        <Videos />
        <ExtraSection2 />
        <MarsParty />
        <Footer />
    </div>
  )
}

export default Home