import React from "react";
import { Link } from "react-router-dom";  
import image16 from "../assets/image16.avif";
import image17 from "../assets/image17.avif";
import image18 from "../assets/image18.avif";
import image19 from "../assets/image19.webp";
import image20 from "../assets/image20.avif";
import image22 from "../assets/image22.avif";
import image23 from "../assets/image23.webp";

const productsDetails = [
  { name: "Best Sellers", image: image16 },
  { name: "New Arrivals", image: image17, badge: "New" },
  { name: "Lips", image: image18 },
  { name: "Eyes", image: image19 },
  { name: "Face", image: image20 },
  { name: "Combos", image: image22 },
  { name: "Lip Combos", image: image23 },
];

const ProductSection = () => {
  return (
    <div className="bg-black py-4 sm:py-5 md:py-5 lg:py-4 xl:py-4 2xl:py-10">
      {/* width control for very large screens */}
      <div className="max-w-screen-2xl mx-auto">
        <div
          className="
            flex justify-start sm:justify-center
            gap-4 sm:gap-6 md:gap-10
            overflow-x-auto scrollbar-none
            px-4 sm:px-6 md:px-8
          "
        >
          {productsDetails.map((product, index) => {
            const routeName = product.name
              .toLowerCase()
              .replace(/ /g, "-")
              .replace(/[^a-z-]/g, "");

            return (
              <Link
                key={index}
                to={`/products/${routeName}`}
                className="flex flex-col items-center text-center group cursor-pointer shrink-0"
              >
                <div className="relative inline-block">
                  <div
                    className="
                      p-[3px] rounded-full
                      bg-gradient-to-tr from-pink-500 via-red-500 to-orange-400
                      group-hover:scale-105 transition-transform duration-300
                    "
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        rounded-full object-cover block
                        h-20 w-20
                        sm:h-22 sm:w-22
                        md:h-24 md:w-24
                        lg:h-24 lg:w-24
                        2xl:h-28 2xl:w-28
                      "
                    />
                  </div>

                  {product.badge && (
                    <span
                      className="
                        absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        bg-pink-600 text-white
                        text-[9px] sm:text-[10px]
                        font-bold px-2 py-[2px]
                        rounded-full border border-white shadow-md z-10
                      "
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <span
                  className="
                    text-white font-medium mt-2
                    text-[11px] sm:text-xs md:text-sm
                    group-hover:text-pink-300 duration-300
                  "
                >
                  {product.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
