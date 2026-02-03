import React, { useState } from 'react'
import logo from '../assets/LOGO.webp'
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {

    const [openCategories, setOpenCategories] = useState(false);
    const [openPolicies, setOpenPolicies] = useState(false);
    const [openConnect, setOpenConnect] = useState(false);

    return (
        <div className="w-full bg-black text-white">

            {/* TOP SECTION */}
            <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-14">

                <div className="
  flex flex-col
  md:flex-col
  xl:flex-row
  justify-between
  items-start
  gap-8 sm:gap-10
">

                    {/* LEFT SECTION */}
                    <div className="
  max-w-md
  flex flex-col
  gap-4 sm:gap-5
  text-center xl:text-left
  mx-auto xl:mx-0
">
                        <img src={logo} alt="mars cosmetics logo" className="w-36 sm:w-40 mx-auto xl:mx-0" />
                        <h1 className="text-lg font-semibold">Makeup for everyone</h1>
                        <p className="text-base leading-relaxed max-w-64">
                            Discover accessible & super-affordable makeup designed for everyone.
                            Based in India, we're here to embrace your unique and diverse beauty with us.
                        </p>
                        {/* SOCIAL ICONS */}
                        <div className="flex justify-center xl:justify-start gap-4 mt-4">
                            <a
                                href="https://x.com/reachedmars"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="p-2 rounded-full hover:bg-white/10 hover:text-sky-400 transition"
                            >
                                <FaTwitter size={20} />
                            </a>

                            <a
                                href="https://www.facebook.com/reachedmars/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="p-2 rounded-full hover:bg-white/10 hover:text-blue-500 transition"
                            >
                                <FaFacebookF size={20} />
                            </a>

                            <a
                                href="https://www.instagram.com/reachedmars/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="p-2 rounded-full hover:bg-white/10 hover:text-pink-500 transition"
                            >
                                <FaInstagram size={20} />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/mars-cosmetics/?originalSubdomain=in"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="p-2 rounded-full hover:bg-white/10 hover:text-blue-400 transition"
                            >
                                <FaLinkedinIn size={20} />
                            </a>

                            <a
                                href="https://www.youtube.com/@MARSCosmetics"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="p-2 rounded-full hover:bg-white/10 hover:text-red-500 transition"
                            >
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:flex xl:flex-row
  gap-4 sm:gap-5
  font-semibold text-lg
  w-full xl:w-auto
  items-start
">

                        {/* CATEGORIES */}
                        <div className="bg-[#211F1F] rounded-lg px-5 py-4 min-w-[250px] max-sm:w-full flex-1 xl:flex-none cursor-pointer"
                            onClick={() => setOpenCategories(!openCategories)}>
                            <div className="flex justify-between">
                                <span>Categories</span>
                                <span>{openCategories ? "-" : "+"}</span>
                            </div>

                            <div className={`overflow-hidden transition-all duration-300 ${openCategories ? "max-h-64 mt-3" : "max-h-0"}`}>
                                <ul className="list-disc text-base font-normal pl-6 flex flex-col gap-2">
                                    <li>
                                        <Link to="/products/best-sellers" className="hover:underline">
                                            Best sellers
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/products/new-arrivals" className="hover:underline">
                                            New Arrivals
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/products/face" className="hover:underline">
                                            Face
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/products/lips" className="hover:underline">
                                            Lips
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/products/eyes" className="hover:underline">
                                            Eyes
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/products/tools" className="hover:underline">
                                            Tools
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/products/combos" className="hover:underline">
                                            Combos
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/products/lip-combos" className="hover:underline">
                                            Lip Combos
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        {/* POLICIES & MORE */}
                        <div className="bg-[#211F1F] rounded-lg px-5 py-4 min-w-[300px] max-sm:w-full flex-1 xl:flex-none cursor-pointer"
                            onClick={() => setOpenPolicies(!openPolicies)}>
                            <div className="flex justify-between">
                                <span>Policies and More</span>
                                <span>{openPolicies ? "-" : "+"}</span>
                            </div>

                            <div className={`overflow-hidden transition-all duration-300 ${openPolicies ? "max-h-64 mt-3" : "max-h-0"}`}>
                                <ul className="list-disc text-base font-normal pl-6 flex flex-col gap-2">
                                    <li>
                                        <Link to="/policies/privacy-policy">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/policies/refund-policy">Refund Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/policies/shipping-policy">Shipping Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/policies/terms-of-service">Terms of Service</Link>
                                    </li>
                                    <li>
                                        <Link to="/policies/subscription-policy">Subscription Policy</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* CONNECT */}
                        <div className="bg-[#211F1F] rounded-lg px-5 py-4 min-w-[190px] max-sm:w-full flex-1 xl:flex-none cursor-pointer"
                            onClick={() => setOpenConnect(!openConnect)}>
                            <div className="flex justify-between">
                                <span>Connect</span>
                                <span>{openConnect ? "-" : "+"}</span>
                            </div>

                            <div className={`overflow-hidden transition-all duration-300 ${openConnect ? "max-h-96 mt-3" : "max-h-0"}`}>

                                <ul className="text-base font-normal flex flex-col gap-3 mt-2">

                                    {/* Queries */}
                                    <li className="flex items-start gap-3">
                                        <MdEmail className="mt-1 text-white" />
                                        <div>
                                            <p className="font-semibold">For Queries:</p>
                                            <a
                                                href="mailto:support@marscosmetics.in"
                                                className="hover:underline"
                                            >
                                                support@marscosmetics.in
                                            </a>
                                        </div>
                                    </li>

                                    {/* Collaborations */}
                                    <li className="flex items-start gap-3">
                                        <MdEmail className="mt-1 text-white" />
                                        <div>
                                            <p className="font-semibold">For Collaborations:</p>
                                            <a
                                                href="mailto:collaborations@marscosmetics.in"
                                                className="hover:underline"
                                            >
                                                collaborations@marscosmetics.in
                                            </a>
                                        </div>
                                    </li>

                                    {/* Phone */}
                                    <li className="flex items-center gap-3">
                                        <FaPhoneAlt className="text-white" />
                                        <a href="tel:+919289507849" className="hover:underline">
                                            +91 92895 07849
                                        </a>
                                    </li>

                                    {/* Timing */}
                                    <li className="text-sm text-gray-300">
                                        Mon – Fri: 10:00 AM – 6:00 PM
                                    </li>
                                </ul>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-700 w-[95%] mx-auto"></div>

            {/* COPYRIGHT */}
            <div className="
  text-center
  md:text-center
  xl:text-right
  py-6
  px-4 xl:pr-10
  font-medium
  text-sm sm:text-base
">
                © 2025, MARS Cosmetics — Designed with ❤️ in India
            </div>

        </div>
    )
}

export default Footer
