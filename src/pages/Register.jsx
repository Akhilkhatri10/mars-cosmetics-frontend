import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import api from "../axiosConfig"; // renamed from axios
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await api.post("/auth/register", formData);

      if (res.data.success) {
        const { token, user } = res.data;

        // 🔐 Save token BEFORE API calls (critical)
        localStorage.setItem("token", token);

        // Update redux
        // dispatch(setUser({ ...user, token }));
        dispatch(setUser({ user, token }));

        toast.success("🎉 Account created successfully!");

        // 🚀 No need to fetch cart here — useLoadUser will do it

        navigate(user.role === "admin" ? "/admin/dashboard" : "/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="
    flex justify-center items-center min-h-screen
    px-4 sm:px-6
    bg-gradient-to-br from-pink-50 to-pink-100
  "
    >
      <div
        className="
    bg-white
    p-6 sm:p-8
    rounded-2xl shadow-xl
    w-full max-w-sm sm:max-w-md
    2xl:max-w-lg
  "
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
  w-full p-3 sm:p-3.5
  border border-gray-300 rounded-lg
  focus:outline-none focus:ring-2 focus:ring-pink-500
"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="
  w-full p-3 sm:p-3.5
  border border-gray-300 rounded-lg
  focus:outline-none focus:ring-2 focus:ring-pink-500
"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="
  w-full p-3 sm:p-3.5
  border border-gray-300 rounded-lg
  focus:outline-none focus:ring-2 focus:ring-pink-500
"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 sm:py-3.5
  bg-pink-600 hover:bg-pink-700
  text-white font-semibold
  rounded-lg shadow-md
  transition duration-200
  ${loading && "opacity-50 cursor-not-allowed"}
`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
