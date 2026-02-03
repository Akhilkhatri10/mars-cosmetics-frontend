// src/pages/ProductsPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useParams, Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import Footer from "../components/Footer";
// import axios from "../axiosConfig"; // axios instance with baseURL + token
import API from "../services/api";
import StickyHeader from "@/components/StickyHeader";
import { getCategories } from "../services/categoryService";


const ProductsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // All products from backend
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    availability: [],
    price: { min: 0, max: 2500 },
    type: [],
  });

  const [openSection, setOpenSection] = useState(null);

  const [categories, setCategories] = useState([]);

  const normalizedCategory = category.replace(/-/g, " ").toLowerCase();

  const categoryId = useMemo(() => {
    const found = categories.find(
      (c) => c.name.toLowerCase() === normalizedCategory
    );
    return found?._id || null;
  }, [categories, normalizedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      }
      catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const CATEGORY_TABS = useMemo(() => {
    return categories.map((c) => c.name);
  }, [categories]);


  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = search
          ? `/products?search=${search}`
          : categoryId
            ? `/products?category=${categoryId}`
            : "/products";

        const res = await API.get(url);
        setBackendProducts(res.data || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, search]);


  const currentCategoryProducts = useMemo(() => {
    return backendProducts.map((p) => ({
      _id: p._id,
      name: p.name,
      price: p.price,
      category: p.category?.name || "",
      type: p.category?.name || "Product",
      inStock: p.stock > 0,
      images: p.images || [],
      buttonText: "Add to cart",
    }));
  }, [backendProducts]);



  const categoryExists = categories.some(
    (c) => c.name.toLowerCase() === normalizedCategory
  );


  // Product types for filter dropdown
  const productTypes = useMemo(() => {
    return currentCategoryProducts.length
      ? [...new Set(currentCategoryProducts.map((p) => p.type))]
      : [];
  }, [currentCategoryProducts]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    if (!currentCategoryProducts.length) return [];

    return currentCategoryProducts.filter((item) => {
      const matchesAvailability =
        !filters.availability.length ||
        (filters.availability.includes("In stock") && item.inStock) ||
        (filters.availability.includes("Out of stock") && !item.inStock);

      const matchesPrice =
        item.price >= filters.price.min &&
        item.price <= filters.price.max;

      const matchesType =
        !filters.type.length ||
        filters.type.some(
          (type) =>
            (item.type || "")
              .toString()
              .trim()
              .toLowerCase() === type.trim().toLowerCase()
        );

      return matchesAvailability && matchesPrice && matchesType;
    });
  }, [currentCategoryProducts, filters]);

  // Handlers
  const toggleSection = (section) =>
    setOpenSection((prev) => (prev === section ? null : section));

  const handleCheckboxChange = (filterType, value, checked) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value]
        : prev[filterType].filter((item) => item !== value),
    }));
  };

  const handlePriceChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      price: { ...prev.price, [name]: Number(value) || 0 },
    }));
  };

  // Category not found at all
  if (!categoryExists) {
    return (
      <div>
        <StickyHeader />
        <div className="text-center py-20 text-gray-500 text-lg">
          Category not found
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <StickyHeader />

      {/* Category Tabs */}
      <div
        className="
          flex flex-wrap justify-center overflow-x-auto no-scrollbar gap-3 mt-6 px-4 
          text-sm 
          sm:gap-4 sm:text-base 
          md:gap-6 
          xl:gap-8 xl:mt-10 xl:text-md
          font-bold
        "
      >
        {CATEGORY_TABS.map((name) => {
          const routeName = name.toLowerCase().replace(/\s+/g, "-");
          const isActive = routeName === category;

          return (
            <Link
              key={name}
              to={`/products/${routeName}`}
              className={`pb-1 transition-all ${isActive
                ? "text-[#92132f] underline underline-offset-4"
                : "text-gray-500 hover:text-[#92132f]"
                }`}
            >
              {name}
            </Link>
          );
        })}
      </div>

      {/* Main layout */}
      <div
  className="
    flex flex-col gap-6
    mt-6 sm:mt-8
    mb-10
    mx-3 sm:mx-4 md:mx-8
    md:flex-row
    2xl:max-w-[1600px] 2xl:mx-auto
  "
>

        {/* Filters */}
<div className="w-full md:w-[30%] xl:w-[20%] md:sticky md:top-24">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
            Filter by
          </h2>

          <FilterDropdown
            title="Availability"
            filterType="availability"
            filterValues={["In stock", "Out of stock"]}
            openSection={openSection}
            toggleSection={toggleSection}
            onChange={handleCheckboxChange}
          />

          {/* Price */}
          <div className="border-t border-gray-300">
            <div
              className="flex justify-between items-center py-3 cursor-pointer"
              onClick={() => toggleSection("price")}
            >
              <span>Price</span>
              <RiArrowDropDownLine
                className={`transition-transform duration-200 ${openSection === "price" ? "rotate-180" : ""
                  }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${openSection === "price"
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
                }`}
            >
              <div className="text-sm pt-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.price.max}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="w-full"
                />

                <div className="flex gap-3 mt-2">
                  <input
                    type="number"
                    placeholder="₹ 0"
                    className="border px-2 py-1 w-full"
                    onChange={(e) =>
                      handlePriceChange("min", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="₹ 1000"
                    className="border px-2 py-1 w-full"
                    onChange={(e) =>
                      handlePriceChange("max", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <FilterDropdown
            title="Product type"
            filterType="type"
            filterValues={productTypes}
            openSection={openSection}
            toggleSection={toggleSection}
            onChange={handleCheckboxChange}
          />
        </div>

        {/* Products grid */}
        <div className="w-full md:w-[70%] xl:w-[80%]">
          {loading && (
            <p className="text-sm text-gray-500 mb-4">Loading products...</p>
          )}

          <div
            className="
              grid grid-cols-2 gap-5 sm:gap-4
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-3
              xl:grid-cols-4 xl:gap-5
              2xl:grid-cols-5
            "
          >

            {filteredProducts.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(`/products/${normalizedCategory}/${item._id}`)
                }
                className="rounded-lg p-2 flex flex-col space-y-2 cursor-pointer hover:shadow-md transition"
              >
                <div className="relative h-48 sm:h-48 rounded-md bg-[#fafafa] overflow-hidden group flex items-center justify-center p-3">
                  {/* Default image */}
                  {item.images?.[0]?.url && (
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                    />
                  )}

                  {/* Hover image */}
                  {item.images?.[1]?.url && (
                    <img
                      src={item.images[1].url}
                      alt={`${item.name} hover`}
                      className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}
                </div>



                <h3 className="text-xs sm:text-sm font-medium line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-600">₹{item.price}</p>

                <button
                  className="bg-black text-white py-2 rounded-md text-xs sm:text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.buttonText}
                </button>
              </div>
            ))}



            {!loading && filteredProducts.length === 0 && (
              <p className="text-sm text-gray-500 col-span-full">
                No products match these filters.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// ----------------------------------------------------
// 🔁 Reusable FilterDropdown
// ----------------------------------------------------
const FilterDropdown = ({
  title,
  filterType,
  filterValues,
  openSection,
  toggleSection,
  onChange,
}) => (
  <div className="border-t border-gray-300">
    <div
      className="flex justify-between items-center py-3 cursor-pointer"
      onClick={() => toggleSection(filterType)}
    >
      <span>{title}</span>
      <RiArrowDropDownLine
        className={`transition-transform duration-200 ${openSection === filterType ? "rotate-180" : ""
          }`}
      />
    </div>

    <div
      className={`overflow-hidden transition-all duration-300 ${openSection === filterType ? "max-h-60 sm:max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
    >
      <div className="ml-2 mb-3 py-2 space-y-2 text-sm">
        {filterValues.map((value) => (
          <label key={value} className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) =>
                onChange(filterType, value, e.target.checked)
              }
            />
            {value}
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default ProductsPage;
