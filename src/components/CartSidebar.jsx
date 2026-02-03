import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increaseQtyLocal, decreaseQtyLocal, removeItemLocal } from "../redux/cartSlice";
import { clearCartLocal } from "../redux/cartSlice";
import axios from "../axiosConfig";
import { toast } from "sonner";

const CartSidebar = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 🔹 cart state
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    // 🔹 Buy Now loading state
    const [buyNowLoadingId, setBuyNowLoadingId] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            setBuyNowLoadingId(null);
        }
    }, [isOpen]);

    const handleClearCart = async () => {
        try {
            // 🔥 Clear cart in backend
            await axios.delete("/cart/clear");

            // 🔥 Clear cart locally
            dispatch(clearCartLocal());

            toast.success("Cart cleared");
        } catch (error) {
            toast.error("Failed to clear cart");
        }
    };

    const handleRemoveItem = async (productId) => {

        if (!productId) {
            toast.error("Invalid cart item");
            return;
        }

        try {
            dispatch(removeItemLocal(productId));
            await axios.delete(`/cart/remove/${productId}`);

        } catch {
            toast.error("Failed to remove item");
        }
    };

    const handleIncreaseQty = async (item) => {
        if (!item?.id) return;

        try {
            dispatch(increaseQtyLocal(item.id));

            await axios.put("/cart/update", {
                productId: item.id,
                quantity: item.quantity + 1,
            });
        } catch {
            toast.error("Failed to update quantity");
        }
    };

    const handleDecreaseQty = async (item) => {
        if (!item?.id) return;

        if (item.quantity === 1) return;

        try {
            dispatch(decreaseQtyLocal(item.id));

            await axios.put("/cart/update", {
                productId: item.id,
                quantity: item.quantity - 1,
            });
        } catch {
            toast.error("Failed to update quantity");
        }
    };


    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 transition-opacity duration-300 z-40 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full
sm:w-[380px]
md:w-[420px]
lg:w-[450px]
2xl:w-[520px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-300">
                    <h2 className="text-2xl font-bold">Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                    >
                        <RiCloseLine className="text-2xl" />
                    </button>
                </div>

                <div className="flex flex-col h-full px-4 sm:px-6 py-6">
                    {cartItems.length > 0 ? (
                        <>
                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid grid-cols-[1fr_auto] gap-4 mb-5 border-b border-gray-300 pb-5"
                                    >
                                        {/* LEFT COLUMN */}
                                        <div className="flex gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-sm"
                                            />


                                            <p className="text-sm sm:text-base font-semibold line-clamp-2">
                                                {item.title}
                                            </p>
                                        </div>

                                        {/* RIGHT COLUMN */}
                                        <div className="flex flex-col items-end gap-2 h-full">
                                            <p className="font-semibold lg:text-base sm:text-sm">
                                                ₹{item.price}
                                            </p>

                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                <button
                                                    className="px-3 py-1 text-lg cursor-pointer"
                                                    onClick={() => handleDecreaseQty(item)}
                                                >
                                                    −
                                                </button>

                                                <span className="px-3">{item.quantity}</span>

                                                <button
                                                    className="px-3 py-1 text-lg cursor-pointer"
                                                    onClick={() => handleIncreaseQty(item)}
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-sm underline cursor-pointer"
                                            >
                                                Remove
                                            </button>

                                            <button
                                                disabled={buyNowLoadingId === item.id}
                                                onClick={() => {
                                                    setBuyNowLoadingId(item.id);

                                                    onClose();
                                                    navigate("/checkout", {
                                                        state: {
                                                            buyNowItem: {
                                                                product: item.id,
                                                                title: item.title,
                                                                price: item.price,
                                                                quantity: item.quantity,
                                                                image: item.image,
                                                            },
                                                        },
                                                    });
                                                }}
                                                className={`cursor-pointer mt-auto px-4 py-2 rounded-md text-sm font-medium transition
    ${buyNowLoadingId === item.id
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-[#af1738] text-white hover:bg-[#bd2949]"
                                                    }`}
                                            >
                                                {buyNowLoadingId === item.id ? "Processing..." : "Buy Now"}
                                            </button>

                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* Footer */}
                            <div className="border-t border-gray-400 space-y-4 pt-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold">
                                        Total: ₹{totalPrice}
                                    </p>

                                    <button
                                        onClick={handleClearCart}
                                        className="text-sm text-red-600 underline cursor-pointer"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        onClose();
                                        navigate("/checkout");
                                    }}
                                    className="mb-16 font-semibold w-full bg-[#af1738] text-white hover:bg-[#a51434] py-3 rounded-md cursor-pointer"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    ) : (
                        // ✅ EMPTY STATE — ONLY RENDERS WHEN cartItems.length === 0
                        <div className="flex flex-col flex-1 justify-center items-center text-center">
                            <p className="text-gray-700 mb-10 text-base sm:text-lg">
                                Your cart is empty
                            </p>

                            <button
                                onClick={onClose}
                                className="bg-[#92132f] text-white px-6 py-3 text-lg rounded-md"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export default CartSidebar;
