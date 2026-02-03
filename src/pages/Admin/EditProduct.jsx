import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});

  const [existingImages, setExistingImages] = useState([]); // URLs from backend
  const [newImages, setNewImages] = useState([]);           // File objects
  const [newPreviews, setNewPreviews] = useState([]);       // blob URLs

  const [updating, setUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  useEffect(() => {
    loadCategories();
    loadProduct();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const loadProduct = async () => {
    try {
      const p = await getProductById(id);

      setFormData({
        name: p.name,
        price: p.price,
        stock: p.stock,
        brand: p.brand,
        discount: p.discount,
        description: p.description,
        category: p.category?._id || "",
      });

      // setExistingImages(p.images.map((img) => img.url));
      setExistingImages(p.images);
    } catch (error) {
      toast.error("Failed to load product");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // setNewImages(files);
    // setNewPreviews(files.map((f) => URL.createObjectURL(f)));
    setNewImages(prev => [...prev, ...files]);
    setNewPreviews(prev => [
      ...prev,
      ...files.map(f => URL.createObjectURL(f))
    ]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const fd = new FormData();

    // Object.keys(formData).forEach((k) => {
    //   fd.append(k, formData[k] ?? "");
    // });

    // // Send remaining existing images (backend decides what to keep)
    // existingImages.forEach((url) => fd.append("existingImages", url));

    // normal fields
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value ?? "");
    });

    // 👇 VERY IMPORTANT
    fd.append("existingImages", JSON.stringify(existingImages));

    // Send new images
    newImages.forEach(img => fd.append("images", img));

    try {
      await updateProduct(id, fd, (e) => {
        setUploadProgress(Math.round((e.loaded * 100) / e.total));
      });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch {
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="relative">
      {updating && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow flex items-center gap-3">
            <Loader2 className="animate-spin text-indigo-600" />
            Updating product...
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            value={formData.price || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="stock"
            type="number"
            value={formData.stock || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Discount */}
          <input
            type="number"
            name="discount"
            value={formData.discount ?? 0}
            onChange={handleChange}
            className="w-full border px-3 sm:px-4 py-2 rounded"
            placeholder="Discount %"
            min="0"
            max="100"
          />

          {/* Category Dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-3 sm:px-4 py-2 rounded"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded h-28"
          />


          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-5">Current Images</p>
              <div className="grid grid-cols-3 gap-3">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative w-24 h-24">
                    <img src={img.url} className="w-full h-full object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(i)}
                      className="cursor-pointer absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload */}
          <label className="block border-dashed border p-4 rounded text-center cursor-pointer">
            Upload New Images
            <input
              type="file"
              multiple accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>

          {/* New Previews */}
          {newPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {newPreviews.map((img, i) => (
                <div key={i} className="relative w-24 h-24">
                  <img src={img} className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="cursor-pointer absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

