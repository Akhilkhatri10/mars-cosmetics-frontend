import React from 'react'
import image4 from '../assets/image4.webp'
import image5 from '../assets/image5.webp'
import image6 from '../assets/image6.webp'
import image7 from '../assets/image7.webp'
import { useNavigate } from "react-router-dom";

const offers = [
  { img: image4, code: "WELCOME2MARS", text: "Flat 15% OFF on Your First Order", pt: "pt-30", category: "best-sellers" },
  { img: image5, code: "FREEKAJAL", text: "Free Twist Up Kajal worth ₹229 on orders Above ₹549", pt: "pt-12", category: "eyes" },
  { img: image6, code: "FREEMAKEUPKIT", text: "Free Makeup Kit worth ₹299 on orders Above ₹699", pt: "pt-12", category: "new-arrivals" },
  { img: image7, code: "NORTHERNGLOW", text: "Free Northern Lights in a Pan worth ₹499 On Orders Above ₹1299", pt: "pt-3", category: "new-arrivals" },
]

const Offers = () => {

  const navigate = useNavigate();

  return (
    <div className="
  flex flex-col items-center
  gap-6 sm:gap-8
  my-10 sm:my-14 lg:my-16
  px-4
">
      <h1 className="text-center text-xl sm:text-2xl font-semibold">Curated Offers For You</h1>

      {/* Responsive Grid */}
      <div className="
  grid grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  2xl:grid-cols-4
  gap-8 sm:gap-10 lg:gap-12
  place-items-center
  max-w-screen-2xl
  mx-auto
">

        {offers.map((offer, index) => (
          <div key={index} className="flex flex-col items-center">

            <img
              src={offer.img}
              alt="offer-image"
              className="
    rounded-t-md mx-auto object-cover
    max-sm:w-[90vw]
    w-[220px] h-[260px]
    sm:w-[260px] sm:h-[300px]
    xl:w-[260px] xl:h-[300px]
    2xl:w-[300px] 2xl:h-[340px]
    transition-transform duration-500 ease-out
    hover:scale-[1.05] hover:-translate-y-1
    will-change-transform
  "
            />
            <div
              onClick={() => navigate("/products/" + offer.category)}
              className="
    flex flex-col text-white bg-black rounded-3xl
    text-center xl:text-left

    max-md:relative
max-md:-translate-y-6


    max-sm:w-[90vw]
    w-[240px] h-[240px] py-5
    sm:w-[260px] sm:h-[300px] sm:p-6
    xl:w-[300px] xl:h-[320px] xl:pl-5 xl:py-10
    2xl:w-[340px] 2xl:h-[360px]

    text-lg sm:text-xl font-semibold
  "
            >

              <span className="text-sm cursor-pointer">Apply code "{offer.code}"</span>

              <h1 className="text-xl sm:text-sm md:text-sm xl:text-3xl font-bold cursor-pointer leading-tight">
                {offer.text}
              </h1>

              <span className={`underline underline-offset-8 ${offer.pt} cursor-pointer transition-transform duration-300 hover:-translate-y-1`}>
                Explore
              </span>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Offers
