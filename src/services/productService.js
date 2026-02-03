
import API from "./api";

// Get all products
export const getProducts = async () => {
  const { data } = await API.get("/products");
  return data;
};

// Get product by ID
export const getProductById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

// Create product (with images)
export const createProduct = async (formData) => {
  const { data } = await API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

// Update product
export const updateProduct = async (id, formData, onUploadProgress) => {
  return await API.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  });
};


// Delete product
export const deleteProduct = async (id) => {
  const { data } = await API.delete(`/products/${id}`);
  return data;
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
