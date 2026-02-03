import MarqueeData from '@/components/MarqueeData'
import Navbar from '@/components/Navbar'
import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '@/axiosConfig';
import Footer from '@/components/Footer';
import StickyHeader from '@/components/StickyHeader';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <p className="text-center py-12 sm:py-20 text-sm sm:text-base">Loading...</p>

    if (error || !blog) return <p className="text-center py-12 sm:py-20 text-sm sm:text-base">Blog not found</p>;


    return (
        <div>
            {/* <MarqueeData />
            <Navbar /> */}
            <StickyHeader />

            {/* blog header div */}
            <div className="bg-gray-100 py-8 sm:py-12 2xl:py-16 px-4 sm:px-0">
                <div className="mx-auto max-w-7xl bg-white rounded-lg overflow-hidden shadow-sm">
                    <div className="flex flex-col lg:flex-row">

                        {/* Left Content */}
                        <div className="
  flex flex-col justify-center
  px-4 sm:px-8 lg:px-10
  py-8 sm:py-12
  lg:w-1/2
">
                            <h1 className="
  text-2xl sm:text-3xl
  lg:text-5xl
  2xl:text-6xl
  font-bold text-[#111e3b]
  leading-tight mb-4 sm:mb-6
">
                                {/* Beat the Heat: Your Guide to Long-Lasting, Sweat-Proof Summer Makeup */}
                                {blog.title}
                            </h1>
                            <span className="text-[17px] text-[#0c1425] opacity-80">
                                {/* May 12, 2025 */}
                                {blog.createdAt && new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Right Image */}
                        <div className="
  lg:w-1/2
  h-[220px] sm:h-[280px]
  lg:h-[420px]
  2xl:h-[520px]
">
                            <img
                                // src="https://marscosmetics.in/cdn/shop/articles/blog_cover_beat_the_heat.jpg?v=1747117069&width=1500"
                                // alt="Summer Makeup"
                                src={blog.coverImage}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>
                </div>
            </div>


            {/* blog content div */}
            <div className="bg-white">
                <div className="
  mx-auto
  max-w-[720px] 2xl:max-w-[860px]
  px-4 sm:px-6
  py-10 sm:py-14 2xl:py-20
  font-sans text-[#0b1b3a]
">
                    <div
                        className="
  text-[15px] sm:text-[17px]
  leading-[1.7] sm:leading-[1.75]
"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </div>

            <Footer />

        </div >
    )
}

export default BlogDetail