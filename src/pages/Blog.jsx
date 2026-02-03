import React, { useEffect, useState } from 'react'
import MarqueeData from '../components/MarqueeData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import image35 from '../assets/image35.webp'
import image36 from '../assets/image36.webp'
import image37 from '../assets/image37.webp'
import image38 from '../assets/image38.webp'
import image39 from '../assets/image39.webp'
import image40 from '../assets/image40.webp'
import BlogCard from './BlogCard'
import axios from '../axiosConfig'
import StickyHeader from '@/components/StickyHeader'


const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("/blogs");
                console.log("API response:", res.data);
                setBlogs(res.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);


    return (
        <div>
            {/* <MarqueeData />
            <Navbar /> */}
            <StickyHeader />

<div className="
  w-full min-h-screen
  px-3 sm:px-6 md:px-8 lg:px-10 xl:px-8 2xl:px-16
  py-6 sm:py-10 md:py-12 2xl:py-16
  bg-gray-100
">
<h2 className="
  text-base sm:text-xl md:text-2xl lg:text-2xl xl:text-xl 2xl:text-3xl
  font-semibold text-black
  mb-4 sm:mb-8 md:mb-10 2xl:mb-14
">
                    Makeup Tips
                </h2>

                {/* GRID LAYOUT - Don't touch xl */}
<div className="
  grid grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  2xl:grid-cols-4
  gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-18
">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Blog
