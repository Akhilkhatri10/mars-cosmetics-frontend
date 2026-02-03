import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../axiosConfig";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import ConfirmModal from "../components/ConfirmModal";
import StickyHeader from "@/components/StickyHeader";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [confirmAction, setConfirmAction] = useState(null);


    const location = useLocation();

    const isAdmin = user?.role === "admin";
    const isAdminRoute = location.pathname.startsWith("/admin");
    const canAdminAct = isAdmin && isAdminRoute;


    // 🔐 Protect route
    useEffect(() => {
        // 🔐 Must be logged in
        if (!isAuthenticated) {
            toast.info("Please log in to view order details");
            navigate("/login");
            return;
        }

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/orders/${id}`);
                const fetchedOrder = res.data;

                const loggedInUserId = user?._id || user?.id;

                // 🔒 Prevent viewing someone else's order
                if (
                    fetchedOrder.user &&
                    fetchedOrder.user._id !== loggedInUserId &&
                    user?.role !== "admin"
                ) {
                    toast.error("You are not allowed to view this order");
                    navigate("/");
                    return;
                }

                setOrder(fetchedOrder);
            } catch (err) {
                setError("Failed to load order");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id, isAuthenticated, user, navigate]);



    if (loading) {
        return (
            <>
                {!isAdminRoute && <Navbar />}
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-600">Loading order...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                {!isAdminRoute && <Navbar />}
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-red-600">{error}</p>
                </div>
            </>
        );
    }

    if (!order) return null;

    const handleMarkDelivered = async () => {
        if (!window.confirm("Mark this order as delivered?")) return;

        try {
            await axios.put(`/orders/${order._id}/deliver`);
            toast.success("Order marked as delivered");

            setOrder((prev) => ({
                ...prev,
                isDelivered: true,
                orderStatus: "Delivered",
            }));
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to deliver order");
        }
    };

    const handleCancelOrder = async () => {
        if (!window.confirm("Cancel this order? This action is irreversible.")) return;

        try {
            await axios.delete(`/orders/${order._id}/cancel`);
            toast.success("Order cancelled");

            navigate("/admin/orders");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to cancel order");
        }
    };


    return (
        <>
            {!isAdminRoute && <StickyHeader />}
            <div
                className="
    max-w-6xl 2xl:max-w-7xl
    mx-auto
    px-4 sm:px-6
    py-8 sm:py-10
    space-y-6 sm:space-y-8
  "
            >
                <h1 className="text-2xl font-semibold">
                    Order #{order.orderNumber}
                </h1>

                {/* Shipping */}
                <div className="bg-white rounded-lg p-6 shadow">
                    <h2 className="font-semibold mb-3">Shipping Address</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} - {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                    </p>
                </div>

                {/* Items */}
                <div className="bg-white rounded-lg p-6 shadow space-y-4">
                    <h2 className="font-semibold">Order Items</h2>

                    {order.orderItems.map((item) => (
                        <div
                            key={item.product}
                            className="
    flex flex-col sm:flex-row
    sm:items-center
    gap-3 sm:gap-4
  "
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>
                            </div>
                            <p className="font-semibold sm:text-right">
                                ₹{item.price * item.quantity}
                            </p>

                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-white rounded-lg p-6 shadow space-y-2">
                    <h2 className="font-semibold">Order Summary</h2>
                    <div className="flex justify-between text-sm">
                        <span>Items</span>
                        <span>₹{order.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span>₹{order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>₹{order.taxPrice}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t">
                        <span>Total</span>
                        <span>₹{order.totalPrice}</span>
                    </div>

                    <p className="text-sm pt-2">
                        Payment: <strong>{order.paymentMethod}</strong>
                    </p>
                    <p className="text-sm flex items-center gap-2">
                        Status:
                        <OrderStatusBadge order={order} />
                    </p>

                    <div className="text-sm">
                        Payment Status:{" "}
                        <span
                            className={
                                order.isPaid ? "text-green-600 font-medium" : "text-red-600 font-medium"
                            }
                        >
                            {order.isPaid ? "Paid" : "Pending"}
                        </span>
                    </div>

                    {canAdminAct && (
                        <div className="mt-6 border-t pt-4 space-y-3">
                            <h3 className="font-semibold text-sm text-gray-700">
                                Admin Actions
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {!order.isDelivered && (
                                    <button
                                        disabled={!order.isPaid}
                                        onClick={() => setConfirmAction("deliver")}
                                        className={`px-4 py-2 rounded-md text-sm text-white
            ${order.isPaid
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Mark as Delivered
                                    </button>
                                )}

                                {/* {!order.isDelivered && (
                                    <button
                                        onClick={() => setConfirmAction("cancel")}
                                        className="px-4 py-2 rounded-md text-sm text-white bg-red-600 hover:bg-red-700"
                                    >
                                        Cancel Order
                                    </button>
                                )} */}
                                <button
                                    disabled={
                                        order.shippingStatus === "Shipped" ||
                                        order.orderStatus === "Delivered" ||
                                        order.orderStatus === "Cancelled"
                                    }
                                    onClick={() => setConfirmAction("cancel")}
                                    className={`cursor-pointer px-4 py-2 rounded-md text-sm text-white
    ${order.shippingStatus === "Shipped" ||
                                            order.orderStatus === "Delivered" ||
                                            order.orderStatus === "Cancelled"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-red-600 hover:bg-red-700"
                                        }
  `}
                                >
                                    Cancel Order
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <ConfirmModal
                open={confirmAction === "deliver"}
                title="Mark order as delivered?"
                description="This will permanently mark the order as delivered."
                confirmText="Deliver"
                confirmColor="green"
                onClose={() => setConfirmAction(null)}
                onConfirm={handleMarkDelivered}
            />

            <ConfirmModal
                open={confirmAction === "cancel"}
                title="Cancel this order?"
                description="This action is irreversible. The order will be removed."
                confirmText="Cancel Order"
                confirmColor="red"
                onClose={() => setConfirmAction(null)}
                onConfirm={handleCancelOrder}
            />
        </>
    );
};

export default OrderDetails;


// 👇 helper component 

const OrderStatusBadge = ({ order }) => {
    let text = "Processing";
    let color = "bg-yellow-100 text-yellow-700";

    if (!order.isPaid) {
        text = "Unpaid";
        color = "bg-red-100 text-red-700";
    } else if (order.isDelivered) {
        text = "Delivered";
        color = "bg-green-100 text-green-700";
    } else if (order.shippingStatus === "Shipped") {
        text = "Shipped";
        color = "bg-blue-100 text-blue-700";
    }

    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${color}`}>
            {text}
        </span>
    );
};
