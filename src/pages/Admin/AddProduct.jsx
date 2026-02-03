// ---------------------- AddProduct.jsx ----------------------
import React, { useState, useEffect } from "react";
import { Upload, ImagePlus, Loader2 } from "lucide-react";
import { createProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    brand: "",
    discount: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      return toast.error("Please select a category");
    }

    setLoading(true);

    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
      images.forEach((img) => fd.append("images", img));

      await createProduct(fd, (percent) => setUploadProgress(percent));

      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl 2xl:max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 2xl:p-10 min-h-[70vh] sm:min-h-[75vh] lg:min-h-auto flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full border px-3 sm:px-4 py-2 sm:py-2.5 rounded text-sm sm:text-base" />

        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full border px-3 sm:px-4 py-2 sm:py-2.5 rounded text-sm sm:text-base" />

        <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="w-full border px-3 sm:px-4 py-2 sm:py-2.5 rounded text-sm sm:text-base" />

        {/* Category Dropdown */}
        <select name="category" value={formData.category} onChange={handleChange} className="w-full border px-3 sm:px-4 py-2 sm:py-2.5 rounded text-sm sm:text-base">
          <option value="">-- Select Category --</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 sm:px-4 py-2 rounded h-24 sm:h-28"
        />

        <label className="block border border-dashed p-4 sm:p-6 rounded cursor-pointer text-center bg-gray-50">
          <ImagePlus size={28} />
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>

        {previewImages.map((img, i) => (
          <div key={i} className="relative group w-24 h-24 inline-block mr-4 mb-3 ">
            <img
              src={img}
              alt={`preview-${i}`}
              className="w-24 h-24 object-cover rounded"
            />

            {/* Remove button */}
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="cursor-pointer absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        ))}


        <button className="cursor-pointer w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded mt-4 hover:bg-indigo-700 text-sm sm:text-base">
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

