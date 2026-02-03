
import React, { useEffect, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  ArrowUpDown,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { getProducts, deleteProduct } from "../../services/productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [deletingId, setDeletingId] = useState(null);

  // Load real backend products
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // 🔍 Improved Search Filter (supports category name, brand, price, ID)
  useEffect(() => {
    const timer = setTimeout(() => {
      const q = query.toLowerCase();
      setFiltered(
        products.filter((p) =>
          p.name?.toLowerCase().includes(q) ||
          (p.category?.name || "").toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.price?.toString().includes(q) ||
          p._id?.toLowerCase().includes(q)
        )
      );
    }, 300); // 🕒 runs 300ms after typing stops

    return () => clearTimeout(timer); // cleanup
  }, [query, products]);



  // Sort
  const sortByPrice = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setFiltered(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeletingId(id);
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      setFiltered(filtered.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    // <div className="bg-white shadow-lg rounded-xl p-6">
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 2xl:p-8 w-full max-w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Product List</h2>

        <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg border">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none text-sm w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      ) : (
        // <div className="overflow-x-auto w-full max-w-full relative">
        <div className="overflow-x-auto overflow-y-auto w-full max-w-full relative max-h-[70vh]">
          <table className="min-w-full text-left text-sm 2xl:text-base">
            <thead className="sticky -top-1 lg:top-0 z-10 bg-gray-50 shadow-sm">
              <tr className="border-b text-gray-600 uppercase text-xs pb-5">
                <th className="py-2 px-2 sm:px-3 lg:px-4">Image</th>
                <th className="py-2 px-2 sm:px-3 lg:px-4">Product</th>
                <th className="py-2 px-2 sm:px-3 lg:px-4 cursor-pointer flex items-center gap-1" onClick={sortByPrice}>
                  Price <ArrowUpDown size={14} />
                </th>
                <th className="py-2 px-2 sm:px-3 lg:px-4">Stock</th>
                <th className="py-2 px-2 sm:px-3 lg:px-4">Category</th>
                <th className="py-2 px-2 sm:px-3 lg:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 sm:px-3 lg:px-4">
                    {p.images?.length > 0 ? (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>

                  <td className="py-2 px-2 sm:px-3 lg:px-4 font-medium max-w-[180px] sm:max-w-none truncate sm:whitespace-normal">{p.name}</td>
                  <td className="py-2 px-2 sm:px-3 lg:px-4 font-semibold">₹{p.price}</td>
                  <td className="py-2 px-2 sm:px-3 lg:px-4">{p.stock}</td>
                  {/* <td className="py-3 px-4">{p.category}</td> */}
                  <td className="py-2 px-2 sm:px-3 lg:px-4">
                    {p.category?.name || p.category || "N/A"}
                  </td>


                  <td className="py-2 px-2 sm:px-3 lg:px-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/admin/edit-product/${p._id}`}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs flex items-center gap-1 hover:bg-indigo-700"
                      >
                        <Pencil size={14} /> Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(p._id)}
                        disabled={deletingId === p._id}
                        className="px-3 py-1 bg-red-600 text-white rounded-md text-xs flex items-center gap-1 hover:bg-red-700 disabled:opacity-60"
                      >
                        {deletingId === p._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
