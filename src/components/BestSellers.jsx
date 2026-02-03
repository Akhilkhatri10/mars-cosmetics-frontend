import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../axiosConfig";
import API from "../services/api";
import { getCategories } from "../services/categoryService";

const categoryTabs = ["Lips", "Eyes", "Face"];

const BestSellers = () => {
  const [activeCategory, setActiveCategory] = useState("Lips");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 1️⃣ Load categories from DB
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  // 2️⃣ Resolve categoryId from activeCategory name
  const categoryId = useMemo(() => {
    const found = categories.find(
      (c) => c.name.toLowerCase() === activeCategory.toLowerCase()
    );
    return found?._id || null;
  }, [categories, activeCategory]);

  // 3️⃣ Fetch products using categoryId
  useEffect(() => {
    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get(
          `/products?category=${categoryId}`
        );
        setProducts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <h1 className="text-center mt-10 md:mt-14 lg:mt-16 font-semibold text-xl sm:text-2xl text-gray-900">
        Shop by Category
      </h1>


      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-base sm:text-lg md:text-xl mt-4 sm:mt-5 cursor-pointer">
        {categoryTabs.map((category) => (
          <span
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`pb-1 ${activeCategory === category
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
              }`}
          >
            {category}
          </span>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-10 text-gray-500">
          Loading products...
        </p>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No products found in {activeCategory}
        </p>
      )}

      {/* Products */}
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 mb-6 px-4 sm:px-6 md:px-8 lg:px-12 max-w-screen-2xl mx-auto"
      >
        {!loading &&
          products.map((product) => (
            <div
              key={product._id}
              onClick={() =>
                navigate(
                  `/products/${activeCategory.toLowerCase()}/${product._id}`
                )
              }
              className="flex flex-col w-full sm:max-w-[240px] md:max-w-[260px] lg:w-72 2xl:w-80 p-2 rounded-lg hover:shadow-lg duration-200 cursor-pointer bg-white"
            >
              <div
                className="relative h-48 sm:h-56 md:h-64 lg:h-72 2xl:h-80 rounded-lg bg-[#fafafa] overflow-hidden group flex items-center justify-center p-4"
              >
                {/* Default Image */}
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />

                {/* Hover Image */}
                {product.images?.[1]?.url && (
                  <img
                    src={product.images[1].url}
                    alt={`${product.name} hover`}
                    className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                )}
              </div>


              <div className="mt-2 text-gray-800 font-semibold text-sm line-clamp-1">
                {product.name}
              </div>

              <p className="mt-1 text-pink-600 font-semibold">
                ₹ {product.price}
              </p>

              <button className="w-full my-2 px-4 py-2 sm:px-5 text-sm sm:text-base text-white bg-black rounded-lg">
                Add to cart
              </button>

            </div>
          ))}
      </div>
    </div>
  );
};

export default BestSellers;
