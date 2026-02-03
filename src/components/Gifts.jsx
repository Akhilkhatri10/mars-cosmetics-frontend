import React from 'react'
import image1 from '../assets/image1.webp'
import image2 from '../assets/image2.webp'
import image3 from '../assets/image3.webp'
import { useNavigate } from "react-router-dom";

const Gifts = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-8 my-16 px-4">
      <h1 className="text-center text-xl sm:text-2xl font-semibold">
        Explore Gifts & Combos
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center">

        {/* CARD 1 */}
        <div className="flex flex-col gap-3 items-center">
          <img
            src={image1}
            alt="gift set 1"
            className="
  rounded-md
  max-sm:w-[90vw]
  w-[220px]
  sm:w-[260px]
  md:w-[300px]
  lg:w-[320px]
  xl:w-[410px]
  2xl:w-[460px]
  h-[280px]
  sm:h-[320px]
  md:h-[380px]
  lg:h-[420px]
  xl:h-[440px]
  2xl:h-[500px]
  object-cover transition-transform duration-500 ease-out hover:scale-[1.05] hover:-translate-y-1 will-change-transform
"
          />
          <div
            onClick={() => navigate("/products/combos")}
            className="
  bg-black text-white text-center
  py-2 sm:py-3
  rounded-md
  max-sm:w-[90vw]
  w-[220px]
  sm:w-[260px]
  md:w-[300px]
  lg:w-[320px]
  xl:w-[410px]
  2xl:w-[460px]
  text-base sm:text-lg xl:text-xl
  font-semibold cursor-pointer
"
          >
            Everyday Essentials
          </div>
        </div>

        {/* CARD 2 */}
        <div className="flex flex-col gap-3 items-center">
          <img
            src={image2}
            alt="gift set 2"
            className="
  rounded-md
  max-sm:w-[90vw]
  w-[220px]
  sm:w-[260px]
  md:w-[300px]
  lg:w-[320px]
  xl:w-[410px]
  2xl:w-[460px]
  h-[280px]
  sm:h-[320px]
  md:h-[380px]
  lg:h-[420px]
  xl:h-[440px]
  2xl:h-[500px]
  object-cover transition-transform duration-500 ease-out hover:scale-[1.05] hover:-translate-y-1 will-change-transform
"
          />
          <div
            onClick={() => navigate("/products/lips")}
            className="
  bg-black text-white text-center
  py-2 sm:py-3
  rounded-md
  max-sm:w-[90vw]
  w-[220px]
  sm:w-[260px]
  md:w-[300px]
  lg:w-[320px]
  xl:w-[410px]
  2xl:w-[460px]
  text-base sm:text-lg xl:text-xl
  font-semibold cursor-pointer
">
            Pout Perfect
          </div>
        </div>

        {/* CARD 3 */}
        <div className="flex flex-col gap-3 items-center">
          <img
            src={image3}
            alt="gift set 3"
            className="
  rounded-md
  max-sm:w-[90vw]
  w-[220px]
  sm:w-[260px]
  md:w-[300px]
  lg:w-[320px]
  xl:w-[410px]
  2xl:w-[460px]
  h-[280px]
  sm:h-[320px]
  md:h-[380px]
  lg:h-[420px]
  xl:h-[440px]
  2xl:h-[500px]
  object-cover transition-transform duration-500 ease-out hover:scale-[1.05] hover:-translate-y-1 will-change-transform
"
          />
          <div
            onClick={() => navigate("/products/eyes")}
            className="
  bg-black text-white text-center
  py-2 sm:py-3
  rounded-md
  max-sm:w-[90vw]
  w-[220px]
  sm:w-[260px]
  md:w-[300px]
  lg:w-[320px]
  xl:w-[410px]
  2xl:w-[460px]
  text-base sm:text-lg xl:text-xl
  font-semibold cursor-pointer
">
            Feline Eyes
          </div>
        </div>

      </div>
    </div>
  )
}

export default Gifts
