import React, { useState, useRef, useEffect } from 'react'
import logo from '../assets/LOGO.webp'
import { RiArrowDropDownLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { BiUser } from "react-icons/bi";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";

const CATEGORY_KEYWORDS = [
    "lips",
    "eyes",
    "face",
    "best sellers",
    "new arrivals",
    "combos",
    "lip combos",
];


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const searchRef = useRef(null);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const { totalQuantity } = useSelector((state) => state.cart);
    // const { items, totalPrice } = useSelector((state) => state.cart);


    const handleUserClick = () => {
        if (isAuthenticated) {
            navigate("/orders");
        } else {
            navigate("/login");
        }
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        const normalized = searchQuery.trim().toLowerCase();
        setShowSearch(false);

        // 🔹 If user searched a category
        if (CATEGORY_KEYWORDS.includes(normalized)) {
            const routeName = normalized.replace(/\s+/g, "-");
            navigate(`/products/${routeName}`);
            return;
        }

        // 🔹 Otherwise normal product search
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    };



    const handleMegaNavigate = (path) => {
        setMegaOpen(false);
        navigate(path);
    };


    // Close search if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        if (showSearch) document.addEventListener("mousedown", handleClickOutside);
        else document.removeEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showSearch]);

    return (
        <>
            {/* Top Navbar */}
            <div className="bg-black text-white font-semibold relative z-50">
                <div className="
    flex items-center justify-between 
    px-4 py-4 
    sm:px-6 
    md:px-10 md:py-6 
    text-xs sm:text-sm md:text-base
    max-w-screen-2xl mx-auto
  ">

                    {/* Left */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                        <button
                            className="md:hidden text-white"
                            onClick={() => setMenuOpen(true)}
                        >
                            <RiMenu3Line size={26} />
                        </button>

                        <Link to="/">
                            <img
                                src={logo}
                                alt="mars cosmetics logo"
                                className="w-14 sm:w-18 md:w-24 lg:w-32"
                            />
                        </Link>

                        {/* Categories Dropdown */}
                        <div
                            className="hidden md:flex items-center gap-1 cursor-pointer relative"
                            onMouseEnter={() => setMegaOpen(true)}
                            onMouseLeave={() => setMegaOpen(false)}
                        >
                            <span className="hover:text-gray-300">Categories</span>
                            <RiArrowDropDownLine size={24} />

                            {megaOpen && (
                                <div className="hidden md:flex gap-8 absolute left-0 top-full w-screen bg-black text-white py-10 px-16 shadow-xl justify-between z-50 ml-[-190px]">
                                    <div className="grid grid-cols-4 gap-10 text-md leading-6">
                                        <div>
                                            <h3 className="mb-5" onClick={() => handleMegaNavigate("/products/lips")}>Lips</h3>
                                            <div className="flex flex-col gap-1">
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/lips")}>Lipstick</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/lips")}>Lip Tint</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/lips")}>Lip Liner</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/lips")}>Lip Gloss</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/lips")}>Lip Balm</a>
                                                <a className="hover:text-gray-300 text-lg font-bold" onClick={() => handleMegaNavigate("/products/lips")}>View All</a>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-5" onClick={() => handleMegaNavigate("/products/eyes")}>Eyes</h3>
                                            <div className="flex flex-col gap-1">
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/eyes")}>Kajal</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/eyes")}>Mascara</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/eyes")}>Eye Shadow</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/eyes")}>Eyebrow</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/eyes")}>Eye Liner</a>
                                                <a className="hover:text-gray-300 text-lg font-bold" onClick={() => handleMegaNavigate("/products/eyes")}>View All</a>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-5" onClick={() => handleMegaNavigate("/products/face")}>Face</h3>
                                            <div className="flex flex-col gap-1">
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/face")}>Foundation</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/face")}>Liquid Blush</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/face")}>Setting Powder</a>
                                                <a className="hover:text-gray-300" onClick={() => handleMegaNavigate("/products/face")}>Gel Compact</a>
                                                <a className="hover:text-gray-300 text-lg font-bold" onClick={() => handleMegaNavigate("/products/face")}>View All</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='space-y-3' onClick={() => handleMegaNavigate("/products/lips")}>
                                        <img src="https://marscosmetics.in/cdn/shop/files/Match-Stick_500x_8ed33da6-9c36-4d70-80c4-d70911ce086e.webp?v=1721369528&width=500" alt="matte lipsticks image" className='w-80 ' />
                                        <span>Matte Lipsticks Box | set of 3 </span>
                                    </div>
                                    <div className='space-y-3' onClick={() => handleMegaNavigate("/products/eyes")}>
                                        <img src="https://marscosmetics.in/cdn/shop/files/Artboard_1_382a6a68-187a-4167-b228-ae36da46c664.png?v=1721370285&width=500" alt="smooth glide kajal image" className='w-80 ' />
                                        <span>Smooth Glide Kajal</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                        <div className="hidden md:flex items-center gap-6">
                            {/* <div className="cursor-pointer">Store Locator</div> */}
                            <Link to="/about-us"><div className="cursor-pointer">About Us</div></Link>
                            <Link to="/blogs"><div className="cursor-pointer">Blog</div></Link>
                            <Link to="/contact-us"><div className="cursor-pointer">Support</div></Link>
                        </div>

                        {/* Search Icon */}
                        <CiSearch
                            size={20}
                            className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
                            onClick={() => setShowSearch(true)}
                        />

                        <BiUser
                            size={20}
                            onClick={handleUserClick}
                            className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-300" />

                        <div className="relative">
                            <PiShoppingCartFill
                                size={20}
                                onClick={() => setIsCartOpen(true)}
                                className="cursor-pointer hover:-translate-y-0.5 transition-transform duration-300"
                            />

                            {totalQuantity > 0 && (
                                <span className="
      absolute
      -top-2 -right-3
      bg-[#92132f] text-white
      text-[10px] sm:text-xs
      px-1.5 py-0.5
      rounded-full
      min-w-[18px]
      text-center
    ">
                                    {totalQuantity}
                                </span>
                            )}
                        </div>


                    </div>
                </div>
            </div>

            {/* 🔍 Search Overlay (Covers Navbar + Slightly More) */}
            <div
                className={`fixed top-0 left-0 w-full bg-white shadow-md transform transition-transform duration-500
    ${showSearch ? "z-50 p-6 pointer-events-auto" : "-translate-y-full pointer-events-none"}
  `}
                ref={searchRef}
            >
                <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 flex items-center gap-4 border-b-2 border-blue-900">
                    <input
                        placeholder="Search products by category (eyes, lips, face, combos, new arrivals ...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        className="w-full p-2 outline-none text-base sm:text-lg bg-transparent"
                    />
                    <CiSearch
                        size={22}
                        className="text-blue-900 cursor-pointer"
                        onClick={handleSearch}
                    />
                </div>
            </div>

            {/* Slight Background Overlay (clicking closes search) */}
            {showSearch && (
                <div
                    onClick={() => setShowSearch(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 transition-opacity duration-500"
                ></div>
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-black text-white z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
                    <span className="text-lg font-semibold">Menu</span>
                    <button onClick={() => setMenuOpen(false)}>
                        <RiCloseLine size={26} />
                    </button>
                </div>

                <div className="flex flex-col gap-5 px-5 py-6 text-sm font-medium">
                    {/* <div className="cursor-pointer">Store Locator</div> */}
                    <Link to="/about-us"><div onClick={() => setMenuOpen(false)} className="cursor-pointer">About Us</div></Link>
                    <Link to="/blogs"><div onClick={() => setMenuOpen(false)} className="cursor-pointer">Blog</div></Link>
                    <Link to="/contact-us"><div onClick={() => setMenuOpen(false)} className="cursor-pointer">Support</div></Link>
                </div>
            </div>

            {/* Overlay for Mobile Menu */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40"
                />
            )}

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

        </>
    )
}

export default Navbar
