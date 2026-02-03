// src/pages/ProductDescription.jsx
import React, { useState } from "react";
import MarqueeData from "../components/MarqueeData";
import Navbar from "../components/Navbar";
import { RiShareForwardLine } from "react-icons/ri";
import ShadeSelector from "./ShadeSelector";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCartLocal } from "../redux/cartSlice";
import { toast } from "sonner";
import axios from "../axiosConfig";
import StickyHeader from "@/components/StickyHeader";
import CustomerReviews from "@/components/CustomerReviews";
import RecommendedProducts from "@/components/RecommendedProducts";

// 🔹 New Sub-Components
const OffersSection = () => (
    <div>
        <div className="flex gap-3">
            {[
                { title: "Flat 15% off on First Order*", info: "Valid on orders above ₹499", code: "WELCOME2MARS" },
                { title: "Free Twist Up Kajal worth ₹229", info: "Valid on orders above ₹549*", code: "FREEKAJAL" },
                { title: "Free Makeup Kit worth ₹229", info: "Valid on orders above ₹699*", code: "FREEMAKEUPKIT" },
                { title: "Free Northern Lights Eyeshadow worth ₹229", info: "Valid on orders above ₹1299*", code: "NORTHERNGLOW" },
            ].map((offer, i) => (
                <div key={i} className="p-3 rounded-md shadow-lg border border-gray-200 bg-white min-w-72">
                    <p className="font-semibold text-sm">{offer.title}</p>
                    <p className="text-sm mt-4">{offer.info}</p>
                    <p className="text-sm">Use code <strong>{offer.code}</strong></p>
                </div>
            ))}
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6" />
        <div className="flex justify-between md:justify-around items-center text-center">
            {[
                { img: "https://marscosmetics.in/cdn/shop/files/Discount.png?v=1720116417", text: "5% OFF on prepaid orders" },
                { img: "https://marscosmetics.in/cdn/shop/files/Vector_5.png?v=1720116418", text: "Secure Payment" },
                { img: "https://marscosmetics.in/cdn/shop/files/Group_2.png?v=1720116417", text: "COD Available" },
            ].map((icon, i) => (
                <div key={i} className="flex flex-col items-center">
                    <img src={icon.img} alt="" className="h-10 w-10" />
                    <p className="text-sm mt-2 leading-tight">{icon.text}</p>
                </div>
            ))}
        </div>
    </div>
);

const DescriptionSection = () => (
    <div className="text-md space-y-3">
        <p>Get glammed up effortlessly with the MARS TRIO Treat – a must-have for stunning eyes in three simple steps.</p>
        <strong>Top 3 Reasons to Love MARS TRIO Treat</strong><br /><br />
        {[
            "Complete Eye Look in one kit",
            "Effortless and time-saving",
            "High-performance formulas",
        ].map((text, i) => (
            <div key={i}>
                <strong>{i + 1}. {text}</strong>
            </div>
        ))}
    </div>
);

const HowToUseSection = () => (
    <div className="text-md space-y-3">
        {[
            "Eyeliner – Define your eyes.",
            "Mascara – Add volume.",
            "Eyeshadow – Blend to finish.",
        ].map((step, i) => (
            <div key={i}>
                <strong>Step {i + 1} - </strong>
                <span>{step}</span>
            </div>
        ))}
    </div>
);

const ProductDescription = () => {

    const { id } = useParams(); // productId from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                toast.error("Product not found");
                console.error("Fetch product error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setSelectedImage(product.images[0].url);
        }
    }, [product]);


    const [openSection, setOpenSection] = useState(null);

    const productImage = product?.images?.[0]?.url || product?.image || "";

    const isInStock =
        typeof product?.inStock === "boolean"
            ? product.inStock
            : product?.stock > 0;

    console.log("Resolved image:", productImage);


    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


    // if (!product) return <div className="p-10 text-center text-gray-500">No product selected.</div>;
    if (!product) {
        return (
            <>
                <Navbar />
                <div className="p-10 text-center text-red-500">
                    Product not found.
                </div>
                <Footer />
            </>
        );
    }


    const handleAddToCart = async () => {
        if (!isInStock) return toast.error("This product is out of stock.");

        // const productId = product._id;

        dispatch(addToCartLocal({
            id: product._id,        // ✅ ALWAYS Mongo _id
            title: product.name,
            price: Number(product.price),
            image: productImage,
        }));

        // if (!user?._id) return toast.info("Login to save your cart permanently");
        if (!isAuthenticated) {
            toast.info("Login to save your cart permanently");
            return;
        }


        try {
            await axios.post("/cart/add",
                {
                    // id: productId,
                    // product: {
                    productId: product._id,
                    // title: product.name,
                    // price: Number(product.price),
                    // image: productImage,
                    // }
                });
            toast.success("Added to cart 🛒");
        } catch (error) {
            toast.error("Failed to sync cart");
            console.error("❌ addToCart error:", error);
        }
    };

    const handleBuyNow = () => {
        if (!isInStock) {
            toast.error("This product is out of stock.");
            return;
        }

        navigate("/checkout", {
            state: {
                buyNowItem: {
                    product: product._id,
                    title: product.name,
                    price: Number(product.price),
                    quantity: 1,
                    image: productImage,
                },
            },
        });
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `Check out this product: ${product.name}`,
                    url: shareUrl,
                });
            } catch (err) {
                console.log("Share cancelled", err);
            }
        } else {
            // fallback (we’ll add this next)
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard");
        }
    };



    const toggleSection = (section) => setOpenSection(openSection === section ? null : section);

    const sections = [
        { title: "Offers and coupons", content: <OffersSection /> },
        { title: "Description", content: <DescriptionSection /> },
        { title: "How to Use", content: <HowToUseSection /> },
    ];


    return (
        <div>
            {/* <MarqueeData />
            <Navbar /> */}
            <StickyHeader />

            <div
                className="
    flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-10
    mt-6 sm:mt-10
    px-4 sm:px-6 md:px-10 lg:px-15
    2xl:max-w-[1600px] 2xl:mx-auto
  "
            >

                {/* Left Side (Image) */}
                <div className="flex flex-col lg:w-[55%] gap-4 py-2 sm:py-5">

                    {/* Main Image */}
                    <div className="flex justify-center max-w-[700px] mx-auto">
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="
    w-full
    max-h-[420px] sm:max-h-[520px]
    lg:max-h-[720px]
    xl:max-h-[780px]
    object-contain
  "
                        />

                    </div>

                    {/* Thumbnails */}
                    {product?.images?.length > 1 && (
                        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img.url)}
                                    className={`cursor-pointer border rounded-lg p-2 transition ${selectedImage === img.url
                                        ? "border-[#92132f] ring-2 ring-[#92132f]/30"
                                        : "border-gray-300 hover:border-black"
                                        }`}
                                >
                                    <img
                                        src={img.url}
                                        alt={`thumbnail-${index}`}
                                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>


                {/* Right Side (Content) */}
                <div className="lg:w-[45%] text-left px-1 sm:px-0">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">{product.name}</h2>
                    <p>⭐⭐⭐⭐⭐<span className="text-base text-gray-800"> 33 Reviews</span></p>

                    <div className="flex justify-between mt-5">
                        <p className="text-2xl font-normal mb-4">Rs. {product.price}</p>

                        {/* Share Icon */}
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-sm mb-6 cursor-pointer bg-[#9b0f2d] text-white px-3 py-2 rounded-md"
                        >
                            <RiShareForwardLine size={16} />
                            <span>Share</span>
                        </button>
                    </div>
                    <p className="text-base mt-[-20px] text-gray-700">MRP Inclusive of all taxes</p>


                    {/* Shade Selector */}
                    {/* <ShadeSelector /> */}

                    {/* Cart Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 mb-3">
                        <button
                            disabled={!isInStock || !product._id}
                            onClick={isInStock ? handleAddToCart : undefined}
                            className={`px-6 cursor-pointer py-3 w-full rounded-md ${isInStock
                                ? "bg-black text-white hover:opacity-90"
                                : "bg-gray-600 cursor-not-allowed opacity-50"
                                }`}
                        >
                            {isInStock ? "ADD TO CART" : "OUT OF STOCK"}
                        </button>

                        <button
                            disabled={!isInStock || !product._id}
                            onClick={handleBuyNow}
                            className={`w-full px-6 py-3 rounded-md cursor-pointer text-white
    ${isInStock
                                    ? "bg-[#92132f] hover:bg-[#9b0f2d]"
                                    : "bg-gray-600 cursor-not-allowed opacity-50"
                                }`}
                        >
                            BUY NOW
                        </button>

                    </div>


                    {/* Dropdown Sections */}
                    {sections.map(({ title, content }, i) => (
                        <div key={i} className="border-b border-gray-300 py-3 cursor-pointer">
                            <div onClick={() => toggleSection(title)} className="flex justify-between items-center">
                                <span className="font-semibold text-sm">{title}</span>
                                <span className="text-lg">{openSection === title ? "-" : "+"}</span>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ${openSection === title ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="text-xs sm:text-sm mt-2">{content}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <CustomerReviews />

            <RecommendedProducts productId={product._id} />

            <Footer />
        </div>
    );
};

export default ProductDescription;
