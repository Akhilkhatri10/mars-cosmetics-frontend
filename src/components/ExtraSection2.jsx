import React from 'react'
import image9 from '../assets/image9.webp'
import image10 from '../assets/image10.webp'
import image11 from '../assets/image11.webp'
import image12 from '../assets/image12.png'
import image13 from '../assets/image13.png'
import image14 from '../assets/image14.png'
import { useNavigate } from "react-router-dom";


const ExtraSection2 = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-8 sm:gap-10 py-8 sm:py-10">
            <h1 className="text-center text-2xl font-semibold">Don't worry, MARS' got you!</h1>

            {/* Responsive Grid Layout */}
            <div className="
  grid grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  gap-8 sm:gap-10
  max-w-7xl 2xl:max-w-screen-2xl
  mx-auto
  px-4
">

                {/* Card 1 */}
                <div className="flex flex-col">
                    <img
                        src={image9}
                        alt=""
                        className="
    max-sm:w-[90vw]
    w-[260px] h-[300px]
    2xl:w-[300px] 2xl:h-[340px]
    rounded-t-md mx-auto
    transition-transform duration-500 ease-out
    hover:scale-[1.05] hover:-translate-y-1
    will-change-transform
  "
                    />
                    <div
                        onClick={() => navigate('/products/lips')}
                        className="
    flex flex-col cursor-pointer
    bg-black text-white
    max-sm:w-[90vw]
    w-[300px] h-[300px]
    2xl:w-[340px] 2xl:h-[340px]
    rounded-3xl
    pl-5 py-8
    text-xl font-semibold
    mx-auto
  "
                    >
                        <img src={image12} alt="" className="w-7 py-2" />
                        <span className="text-sm">Try the MARS Lipstick Shade Finder</span>
                        <h1 className="text-4xl max-w-[200px]">Confusing Lipstick shades?</h1>
                        <span
                            className="underline underline-offset-8 pt-4 cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                            Find Your Shade
                        </span>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col">
                    <img
                        src={image10}
                        alt=""
                        className="
    max-sm:w-[90vw]
    w-[260px] h-[300px]
    2xl:w-[300px] 2xl:h-[340px]
    rounded-t-md mx-auto
    transition-transform duration-500 ease-out
    hover:scale-[1.05] hover:-translate-y-1
    will-change-transform
  "
                    />
                    <div
                        onClick={() => navigate('/products/eyes')}
                        className="
    cursor-pointer flex flex-col
    bg-black text-white
    max-sm:w-[90vw]
    w-[300px] h-[260px]
    2xl:w-[340px] 2xl:h-[300px]
    rounded-3xl
    pl-5 py-8
    text-xl font-semibold
    mx-auto
  "
                    >

                        <img src={image13} alt="" className="w-7 py-2" />
                        <span className="text-sm">Looking for a base?</span>
                        <h1 className="text-4xl max-w-[230px]">Now, let's get to the Base</h1>
                        <span
                            className="underline underline-offset-8 pt-4 cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                            Find Your Shade
                        </span>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="flex flex-col">
                    <img
                        src={image11}
                        alt=""
                        className="
    max-sm:w-[90vw]
    w-[260px] h-[300px]
    2xl:w-[300px] 2xl:h-[340px]
    rounded-t-md mx-auto
    transition-transform duration-500 ease-out
    hover:scale-[1.05] hover:-translate-y-1
    will-change-transform
  "
                    />
                    <div
                        onClick={() => navigate('/products/face')}
                        className="
    cursor-pointer flex flex-col
    bg-black text-white
    max-sm:w-[90vw]
    w-[300px] h-[260px]
    2xl:w-[340px] 2xl:h-[300px]
    rounded-3xl
    pl-5 py-8
    text-xl font-semibold
    mx-auto
  "
                    >

                        <img src={image14} alt="" className="w-7 py-2" />
                        <span className="text-sm">Still confused?</span>
                        <h1 className="text-4xl max-w-[260px]">Contact our beauty advisor</h1>
                        <span
                            className="underline underline-offset-8 pt-4 cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                            Ring the Expert
                        </span>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ExtraSection2
