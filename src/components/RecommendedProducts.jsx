import React, { useEffect, useState } from "react";
// import axios from "@/axiosConfig";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const RecommendedProducts = ({ productId }) => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            const res = await API.get(
                `/products/recommended/${productId}`
            );
            setProducts(res.data);
        };

        fetchRecommendations();
    }, [productId]);

    if (products.length === 0) return null;

    return (
        <div className="my-6 bg-[#fafafa] px-4 sm:px-6 lg:px-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold py-6 text-center">
                Recommended Products
            </h2>

            <div
                className="
    max-sm:flex
    max-sm:overflow-x-auto
    max-sm:gap-4
    max-sm:pb-4
    max-sm:snap-x
    max-sm:snap-mandatory
    
    grid
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    2xl:grid-cols-5
    gap-4 sm:gap-6
    mx-0 lg:mx-6
  "
            >

                {products.map((item) => (
                    <div
                        key={item._id}
                        className="
    bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer my-6
    max-sm:min-w-[80vw]
    max-sm:snap-center
  "                        onClick={() => navigate(`/products/${item.category}/${item._id}`)}
                    >

                        <div className="relative aspect-square p-0 bg-white rounded-md overflow-hidden group">
                            {/* Default Image */}
                            <div className="w-full h-full p-4 flex items-center justify-center">
                                <img
                                    src={item.images?.[0]?.url}
                                    alt={item.name}
                                    className="max-w-full max-h-full object-contain transition-opacity duration-300"
                                />
                            </div>

                            {/* Hover Image */}
                            {item.images?.[1]?.url && (
                                <img
                                    src={item.images[1].url}
                                    alt={`${item.name} hover`}
                                    className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                />
                            )}
                        </div>



                        <div className="px-4 pb-4">
                            <h3 className="text-sm sm:text-base font-semibold line-clamp-1">
                                {item.name}
                            </h3>

                            <p className="text-[#92132f] font-semibold mt-2 text-sm sm:text-base">
                                ₹{item.price}
                            </p>

                            <button className="mt-4 w-full bg-black text-white py-2 sm:py-2.5 rounded-md text-sm sm:text-base">
                                Add to bag
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts;
