import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
// import axios from "../axiosConfig";
import API from "../services/api";
import { toast } from "sonner";
import { logout } from "../redux/authSlice";
import { clearCartLocal } from "../redux/cartSlice";
import logo2 from "../assets/logo2.avif";

const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userMenuRef = useRef(null);
    const { user, loading: authLoading } = useSelector((state) => state.auth);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [error, setError] = useState("");
    const [openUserMenu, setOpenUserMenu] = useState(false);

    // 🔐 Protect route
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            toast.info("Please log in to view your orders");
            navigate("/login");
        }
    }, [authLoading, isAuthenticated, navigate]);


    // 📦 Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await API.get("/orders/myorders");
                setOrders(res.data || []);
            } catch (err) {
                setError("Failed to load orders");
            } finally {
                setOrdersLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(e.target)
            ) {
                setOpenUserMenu(false);
            }
        };

        if (openUserMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openUserMenu]);


    // 🚪 Logout
    const handleLogout = async () => {
        try {
            await API.post("/auth/logout");
            dispatch(clearCartLocal());
            dispatch(logout());
            // localStorage.removeItem("token");
            navigate("/login");
        } catch {
            toast.error("Failed to log out");
        }
    };

    const handleCancelOrder = async (e, orderId) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            await API.delete(`/orders/${orderId}/cancel`);

            setOrders((prev) => prev.filter((o) => o._id !== orderId));
            toast.success("Order cancelled successfully");
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Failed to cancel order"
            );
        }
    };


    return (
        <div className="min-h-screen bg-[#e0d9d9]">
            {/* ===== Header (Shopify-style) ===== */}
            <header className="border-b bg-white">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Left */}
                    <div className="flex items-center gap-8 px-15">
                        <Link to="/" className="flex items-center">
                            <img
                                src={logo2}
                                alt="MARS"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>


                        <nav className="flex gap-8 text-[14px] text-gray-700">
                            <Link to="/" className="text-black">
                                Shop
                            </Link>
                            <Link
                                to="/orders"
                                className="border-b-1 border-black font-medium text-black"
                            >
                                Orders
                            </Link>
                        </nav>
                    </div>

                    {/* Right: User dropdown */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setOpenUserMenu((p) => !p)}
                            className="flex items-center gap-1 text-gray-700 hover:text-black cursor-pointer"
                        >
                            <BiUserCircle size={30} />
                            <RiArrowDownSLine size={20} />
                        </button>

                        {openUserMenu && (
                            <div className="absolute right-0 p-3 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                                <div className="px-4 py-4 border-b text-sm text-gray-700 truncate cursor-pointer">
                                    {user?.email}
                                </div>

                                <button
                                    onClick={() => navigate("/profile")}
                                    className="w-full text-left px-4 py-4 text-sm hover:bg-gray-100 cursor-pointer"
                                >
                                    Profile
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full cursor-pointer text-left px-4 py-4 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ===== Content ===== */}
            <main className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-xl font-semibold mb-10">Orders</h1>

                {/* 🔄 Loading */}
                {ordersLoading && (
                    <p className="text-sm text-gray-600">Loading your orders...</p>
                )}

                {/* ❌ Error */}
                {!ordersLoading && error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}

                {/* 📭 Empty */}
                {!ordersLoading && !error && orders.length === 0 && (
                    <div className="bg-white rounded-lg py-16 text-center">
                        <h2 className="text-base font-medium">No orders yet</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Go to store to place an order.
                        </p>

                        <Link
                            to="/"
                            className="inline-block mt-4 underline text-sm text-black"
                        >
                            Go to store
                        </Link>
                    </div>
                )}

                {/* 📋 Orders List */}
                {!ordersLoading && orders.length > 0 && (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Link
                                key={order._id}
                                to={`/orders/${order._id}`}
                                className="block bg-white rounded-lg p-6 hover:shadow transition"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium hover:border hover:border-gray-200 rounded-2xl">
                                            Order #{order.orderNumber}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(order.createdAt).toDateString()}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-medium">
                                            ₹{order.totalPrice}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {order.orderStatus}
                                        </p>

                                        {/* ❌ Cancel button */}
                                        {["Pending", "Processing"].includes(order.orderStatus) && (
                                            <button
                                                onClick={(e) =>
                                                    handleCancelOrder(e, order._id)
                                                }
                                                className="mt-3 text-sm text-red-600 underline hover:text-red-800 hover:bg-gray-100 border border-red-100 px-2 py-1 rounded cursor-pointer"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                )}

                {/* ===== Footer Links ===== */}
                <footer className="border-t mt-24 pt-5 flex flex-wrap gap-6 text-xs text-red-800 underline">
                    {[
                        "Refund policy",
                        "Shipping",
                        "Privacy policy",
                        "Terms of service",
                        "Cancellations",
                    ].map((item) => (
                        <span key={item} className="cursor-pointer hover:text-red-600">
                            {item}
                        </span>
                    ))}
                </footer>
            </main>
        </div>
    );
};

export default Orders;
