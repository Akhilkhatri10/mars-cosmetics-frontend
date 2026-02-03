import React, { useState } from 'react'
import { toast } from "sonner";
import MarqueeData from '../components/MarqueeData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StickyHeader from '@/components/StickyHeader';

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const ContactUs = () => {

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, name, message } = formData;

        if (!email || !name || !message) {
            toast.error("Please fill all fields");
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        toast.success("Thanks for contacting us! We’ll reach out soon 💌");

        setFormData({ email: "", name: "", message: "" });
    };


    return (
        <div>
            {/* <MarqueeData />
            <Navbar /> */}
            <StickyHeader />


            <h1 className='
  text-center
  text-lg sm:text-2xl md:text-3xl
  text-gray-800
  mt-8 sm:mt-10 md:mt-20
  font-semibold
'>
                Contact Us
            </h1>

            {/* Responsive Form Wrapper */}

            <form className='space-y-6 ' onSubmit={handleSubmit}>
                <div
                    className="
    border border-gray-300
    mt-6

    mx-3 sm:mx-8 md:mx-20 lg:mx-40 xl:mx-10 2xl:mx-auto
    max-w-none 2xl:max-w-4xl

    py-8 sm:py-14 md:py-20
    px-4 sm:px-10 md:px-20 lg:px-40 xl:px-96 2xl:px-24

    rounded-md
  "
                >

                    <div className='bg-gray-100 border-b border-gray-700 pl-2 py-3 mb-4 sm:mb-6'>
                        <label htmlFor="email" className='text-gray-500 block mb-1'>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            // className='w-full bg-transparent outline-none text-gray-800'
                            className={`w-full bg-transparent outline-none ${formData.email && !isValidEmail(formData.email)
                                ? "text-red-500"
                                : "text-gray-800"
                                }`}
                        />
                    </div>

                    <div className='bg-gray-100 border-b border-gray-700 pl-2 py-3 mb-4 sm:mb-6'>
                        <label htmlFor="name" className='text-gray-500 block mb-1'>Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='w-full bg-transparent outline-none text-gray-800' />
                    </div>

                    <div className='border border-gray-300 p-4'>
                        <label htmlFor="message" className='block mb-2 text-gray-600'>Leave a comment*</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className='w-full h-28 sm:h-32 outline-none bg-transparent'></textarea>
                    </div>
                </div>

                <div className='text-center'>
                    <button
                        type="submit"
                        className='
  text-base sm:text-lg
  bg-pink-700 text-white
  px-6 py-2.5
  rounded-sm
  mt-8 sm:mt-10 mb-10
  hover:bg-pink-800 transition
  cursor-pointer
'>
                        Send
                    </button>
                </div>
            </form>


            <Footer />
        </div>
    )
}

export default ContactUs
