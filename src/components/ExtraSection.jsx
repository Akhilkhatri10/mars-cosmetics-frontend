import React from 'react'
import image8 from '../assets/image8.webp'
import { useNavigate } from "react-router-dom";

const ExtraSection = () => {

  const navigate = useNavigate();

  return (
    <div className="
  bg-gray-200 w-full
  py-12 sm:py-16 lg:py-18
  px-4 sm:px-6 md:px-10
">
      <div className="
  bg-white
  flex flex-col-reverse md:flex-row
  max-w-7xl 2xl:max-w-screen-2xl
  mx-auto
  rounded-3xl
  justify-between
  h-auto md:h-[440px] 2xl:h-[520px]
  overflow-hidden
">

        {/* LEFT TEXT SECTION */}
        <div className="
  px-6 sm:px-10 md:pl-20
  py-8 md:py-0
  flex flex-col justify-center
">
          <div className="text-2xl sm:text-3xl md:text-6xl font-bold max-w-md 2xl:max-w-lg">
            <h1>Who doesn't love a free gift?</h1>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-8 font-semibold text-sm sm:text-base md:text-xl max-w-md 2xl:max-w-lg">
            <p>Get a free 15 Color Eyeshadow Palette worth Rs.449 on purchase above Rs.999*</p>
          </div>

          <div className="mt-4 sm:mt-6 md:mt-10 font-semibold text-sm sm:text-base md:text-xl">
            <span>Use Code: BIGBASHSALE</span>
          </div>

          <div
            onClick={() => navigate("/products/combos")}
            className="
    mt-6 sm:mt-8 md:mt-10
    w-fit
    rounded-md
    font-semibold
    bg-black text-white
    px-5 py-3
    text-sm sm:text-base
    cursor-pointer
  "
          >
            <button className="cursor-pointer">Get yours now!</button>
          </div>

        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="flex justify-center md:justify-end items-center px-4 md:px-0">
          <img
            src={image8}
            alt="image"
            className="
      w-full
      max-w-[220px]
      sm:max-w-sm
      md:max-w-md
      lg:max-w-lg
      2xl:max-w-xl
      object-contain
      transition-transform duration-500 ease-out
      hover:scale-[1.05] hover:-translate-y-1
      will-change-transform
    "
          />
        </div>


      </div>
    </div>
  )
}

export default ExtraSection
