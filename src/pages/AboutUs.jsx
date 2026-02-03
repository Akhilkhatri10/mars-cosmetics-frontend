import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Marquee from "react-fast-marquee";
import image24 from '../assets/image24.webp'
import image25 from '../assets/image25.webp'
import image26 from '../assets/image26.webp'
import image27 from '../assets/image27.webp'
import image28 from '../assets/image28.webp'
import image29 from '../assets/image29.webp'
import image30 from '../assets/image30.webp'
import image31 from '../assets/image31.avif'
import image32 from '../assets/image32.avif'
import image33 from '../assets/image33.avif'
import image34 from '../assets/image34.avif'
import StickyHeader from '@/components/StickyHeader';

const AboutUs = () => {
    return (

        <div className="w-full overflow-x-hidden">
            <StickyHeader />

            <div className='bg-[#fce9d0]'>
                <div className="pt-16">
                    <h1 className="text-center font-semibold text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl">
                        MARS Cosmetics
                    </h1>
                    <h3 className="text-center text-lg md:text-xl mt-2">Makeup For Everyone</h3>
                </div>

                <Marquee gradient={false} speed={50} pauseOnHover={true} className="mt-6">
                    {[image24, image25, image26, image27, image28, image29].map((src, i) => (
                        <div key={i} className="px-2 w-[70vw] sm:w-72 md:w-80 lg:w-96 2xl:w-[420px] rounded-3xl overflow-hidden">
                            <img src={src} alt="" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </Marquee>

                <p className='
  text-center
  text-sm sm:text-lg md:text-xl
  mt-8 sm:mt-10
  pb-12 sm:pb-14
  max-w-3xl
  mx-auto
  px-4
'>
                    At MARS Cosmetics, we believe beauty is for everyone. From our humble beginnings to becoming India’s most loved makeup brand, our journey has always been about empowering you. We create high-quality, accessible products that let you express your unique self with confidence and creativity. Together, we’re redefining beauty standards — celebrating individuality in every shade, every style, and every story.
                </p>
            </div>

            {/* Stats Section */}
            <div className='
  flex flex-wrap justify-center
  gap-6 sm:gap-10 md:gap-20 lg:gap-24
  bg-[#9e0e2d] text-white
  py-10 sm:py-12 2xl:py-16
'>

                {[
                    ["2015", "Our First Step"],
                    ["Delhi", "Our Foundation"],
                    ["27 million +", "Products sold in FY'24"],
                    ["300 Cr. +", "Our FY'24 Turnover"]
                ].map(([big, small], i) => (
                    <div key={i} className='flex flex-col items-center'>
                        <span className='text-2xl sm:text-3xl md:text-4xl font-bold'>{big}</span>
                        <span className='text-lg sm:text-xl md:text-2xl'>{small}</span>
                    </div>
                ))}
            </div>

            <img src={image30} alt="" className="w-full" />

            {/* Brand Statement */}
            <div className='bg-black text-white pt-16 px-4'>
                <h4 className='text-center text-xl md:text-2xl'>Our Brand Statement</h4>
                <h1 className='text-center text-3xl md:text-4xl font-bold pt-2'>Makeup for Everyone</h1>
                <p className='
  pt-3 text-center
  max-w-4xl
  text-base sm:text-lg md:text-2xl
  mx-auto
  pb-12 sm:pb-16
'>
                    At MARS, beauty has no labels, limits, or stereotypes. Our DNA is rooted in celebrating diversity and empowering self-expression — making sure everyone feels seen, valued, and free to be themselves. Inclusivity isn’t a checkbox for us; it’s the very fabric of who we are. With bold ideas and accessible beauty, we’re redefining what it means to feel confident, creative, and unapologetically you.
                </p>
            </div>

            {/* This is our outlook section */}
            <div className='bg-[#c01140] px-4'>
                <h2 className='text-center text-xl md:text-2xl pt-12 text-white'>This is our outlook</h2>
                <h1 className='text-center text-2xl md:text-3xl font-bold pt-4 text-white'>
                    Boldly Positive. Fearlessly Creative. Power in Your Hands. Always Mindful
                </h1>

                <div className='
  grid grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-4
  gap-4 sm:gap-6
  px-4
  mt-8 sm:mt-10
  pb-12 sm:pb-14
'>
                    {[
                        ["Boldly Positive", "We believe beauty should uplift. Every lipstick, every eyeliner, every small step can spark confidence and joy."],
                        ["Fearlessly Creative", "Makeup is about expression, not rules. We experiment, we play, and we inspire you to find your own unique style."],
                        ["Power in Your Hands", "We don’t just sell makeup — we give you the tools to own your look, your story, and your confidence every single day."],
                        ["Always Mindful", "We stay grounded in the realities of our industry, trends, and community — evolving responsibly while creating beauty that lasts."]
                    ].map(([title, text], i) => (
                        <div key={i} className='bg-[#faefcd] px-4 py-6 rounded-2xl'>
                            <span className='text-2xl md:text-[28px] font-bold'>{title}</span>
                            <p className='font-semibold mt-3'>{text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges */}
            <div className='
  flex flex-wrap justify-center
  gap-10 sm:gap-20 lg:gap-40
  bg-[#faefcd]
  py-10 sm:py-12 2xl:py-16
'>
                {[image34, image31, image32, image33].map((src, i) => (
                    <div key={i} className='flex flex-col items-center space-y-3'>
                        <img src={src} alt="" className='w-20 sm:w-28 md:w-32' />
                        <span className='text-lg md:text-xl'>{["Cruelty Free", "Vegetarian", "Easy to use", "Designed in India"][i]}</span>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    )
}

export default AboutUs