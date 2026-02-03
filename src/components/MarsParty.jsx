import React, { useState } from "react";
import { toast } from "sonner";
import api from "../axiosConfig";
import image12 from '../assets/image12.webp'

const MarsParty = () => {

  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      return toast.error("Please enter your email");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }

    try {
      await api.post("/subscribe", { email });
      toast.success("🎉 You’re in! Check your inbox for offers");
      setEmail("");
    } catch (err) {
      toast.error("You’re already subscribed!");
    }
  };

  return (
    <div className="
  bg-gray-200 w-full
  py-10 sm:py-12
  px-4 md:px-8
">
      <div className="
  bg-white
  flex flex-col md:flex-row
  max-w-7xl 2xl:max-w-screen-2xl
  mx-auto
  rounded-3xl
  justify-between
  h-auto md:h-[500px] 2xl:h-[560px]
  overflow-hidden
">

        {/* LEFT IMAGE */}
        <div className="
  w-full md:w-1/2
  flex items-center justify-center
  p-4 sm:p-6 md:p-0
">
          <img
            src={image12}
            alt="image"
            className="
      w-[220px] h-[200px]
      sm:w-[300px] sm:h-[260px]
      md:w-[450px] md:h-[350px]
      xl:w-[550px] xl:h-[420px]
      2xl:w-[620px] 2xl:h-[460px]
      object-contain
    "
          />
        </div>


        {/* RIGHT TEXT */}
        <div className="
  w-full md:w-1/2
  pl-6 md:pl-12 lg:pl-20
  pt-4 sm:pt-6 md:pt-8
  pb-6 sm:pb-8
  text-center md:text-left
">

          <h1 className="
  text-2xl sm:text-3xl md:text-5xl xl:text-6xl
  font-semibold
  max-w-sm 2xl:max-w-md
  text-[#0F1B3B]
  mx-auto md:mx-0
">
            Join the MARS Party!
          </h1>


          <p className="
  mt-3 sm:mt-4
  text-sm sm:text-base md:text-xl
  font-semibold
  max-w-md 2xl:max-w-lg
  text-[#0F1B3B]
  mx-auto md:mx-0
">
            Subscribe to get discount of 15% on Your First Order.
            <span className="font-bold"> Exclusively for You.</span>
          </p>

          <div className="mt-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="
    border border-black
    px-4 py-2
    w-full
    sm:w-[350px]
    md:w-[350px]
    lg:w-[400px]
    xl:w-[450px]
    rounded-md
  "
            />

          </div>

          <p className="mt-2 text-[13px] text-[#0a132b] max-w-md mx-auto md:mx-0">
            Sign up for fab updates from MARS Cosmetics. Standard rates apply. <br />
            Read our Terms and Privacy.
          </p>

          <button
            onClick={handleSubscribe}
            className="
    mt-4
    px-6 py-3
    rounded-md
    font-semibold
    bg-black text-white
    cursor-pointer
    hover:opacity-80
    transition
  "
          >
            Subscribe
          </button>

        </div>
      </div>
    </div>
  )
}

export default MarsParty
