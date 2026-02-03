import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
// import axios from "../axiosConfig";
import API from "../services/api";
import { clearCartLocal } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import StickyHeader from "@/components/StickyHeader";


const Checkout = () => {
    const { items, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [shipping, setShipping] = useState({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
    });

    const location = useLocation();
    const buyNowItem = location.state?.buyNowItem;

    const checkoutTotal = buyNowItem
        ? buyNowItem.price * buyNowItem.quantity
        : totalPrice;

    if (!buyNowItem && items.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-gray-600">Your cart is empty.</p>
                </div>
            </>
        );
    }

    const checkoutItems = buyNowItem
        ? [
            {
                id: buyNowItem.product,
                title: buyNowItem.title,
                price: buyNowItem.price,
                quantity: buyNowItem.quantity,
                image: buyNowItem.image,
            },
        ]
        : items;


    const loadRazorpay = async () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Razorpay SDK failed to load"));

            document.body.appendChild(script);
        });
    };

    const handlePlaceOrder = async () => {
        if (
            !shipping.address ||
            !shipping.city ||
            !shipping.postalCode ||
            !shipping.country
        ) {
            return toast.error("Please fill all shipping fields");
        }

        try {
            // const orderItems = items.map((item) => ({
            //     product: item.id,      // ✅ backend expects product ID
            //     quantity: item.quantity,
            // }));

            const orderItems = buyNowItem
                ? [
                    {
                        product: buyNowItem.product,
                        quantity: buyNowItem.quantity,
                    },
                ]
                : checkoutItems.map((item) => ({
                    product: item.id,
                    quantity: item.quantity,
                }));


            const res = await API.post("/orders", {
                orderItems,
                shippingAddress: shipping,
                paymentMethod,
                taxPrice: 0,
                shippingPrice: 0,
            });

            const order = res.data.createdOrder;

            // 🔹 CASE 1: COD (NO CHANGE)
            if (paymentMethod === "COD") {
                toast.success("Order placed successfully ✅");
                // dispatch(clearCartLocal());

                // ✅ Clear cart ONLY if this was normal cart checkout
                if (!buyNowItem) {
                    dispatch(clearCartLocal());
                }

                navigate(`/orders/${order._id}`);
                return;
            }

            // 🔹 CASE 2: Razorpay
            await loadRazorpay(); // 👈 THIS is where async/await is used

            // Create Razorpay order (backend)
            const razorpayRes = await API.post("/payment/razorpay/create", {
                orderId: order._id,
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: razorpayRes.data.amount,
                currency: "INR",
                order_id: razorpayRes.data.id,

                handler: async function (response) {
                    // Verify payment
                    await API.post("/payment/razorpay/verify", {
                        ...response,
                        orderId: order._id,
                    });

                    // toast.success("Payment successful 🎉");
                    toast.success("Payment confirmed. Order placed successfully 🎉");
                    // dispatch(clearCartLocal());

                    // ✅ Clear cart ONLY if this was normal cart checkout
                    if (!buyNowItem) {
                        dispatch(clearCartLocal());
                    }

                    navigate(`/orders/${order._id}`);
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error(error);
            toast.error("Failed to place order");
        }
    };

    return (
        <>
            {/* <Navbar /> */}
            <StickyHeader />

            <div
                className="
    max-w-6xl 2xl:max-w-7xl
    mx-auto
    px-4 sm:px-6 md:px-8
    py-6 sm:py-8 md:py-10
    grid
    md:grid-cols-3
    gap-6 sm:gap-8
  "
            >
                {/* LEFT */}
                <div className="md:col-span-2 space-y-5 sm:space-y-6">
                    <h2 className="text-2xl font-semibold">Checkout</h2>

                    {/* SHIPPING */}
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
                        <h3 className="font-semibold">Shipping Address</h3>

                        {Object.keys(shipping).map((key) => (
                            <input
                                key={key}
                                placeholder={key}
                                value={shipping[key]}
                                onChange={(e) =>
                                    setShipping({ ...shipping, [key]: e.target.value })
                                }
                                className="w-full p-3 sm:p-3 border rounded-md"
                            />
                        ))}
                    </div>

                    {/* PAYMENT */}
                    <div className="bg-white p-6 rounded-lg shadow space-y-3">
                        <h3 className="font-semibold">Payment Method</h3>

                        <label className="flex gap-2 items-center">
                            <input
                                type="radio"
                                checked={paymentMethod === "COD"}
                                onChange={() => setPaymentMethod("COD")}
                            />
                            Cash on Delivery
                        </label>

                        <label className="flex gap-2 items-center">
                            <input
                                type="radio"
                                checked={paymentMethod === "Razorpay"}
                                onChange={() => setPaymentMethod("Razorpay")}
                            />
                            Pay Online (UPI / Card / Netbanking)
                        </label>

                    </div>
                </div>

                {/* RIGHT */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow h-fit space-y-4">
                    <h3 className="font-semibold">Order Summary</h3>

                    <div className="flex justify-between text-sm">
                        <span>Total</span>
                        <span className="font-semibold">₹{checkoutTotal}</span>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="
  w-full cursor-pointer
  bg-[#af1738] text-white
  py-3
  rounded-md
  hover:bg-[#a51434]
  text-base sm:text-base
"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </>
    );
};

export default Checkout;
