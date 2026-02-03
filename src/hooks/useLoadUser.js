import { useEffect, useRef } from "react";
// import api from "../axiosConfig"; 
import API from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../redux/authSlice";
import { setCart, clearCartLocal } from "../redux/cartSlice";

export default function useLoadUser() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const hasLoaded = useRef(false); // prevent duplicate calls on dev mode + StrictMode

    useEffect(() => {
        if (hasLoaded.current) return; // prevents double-call in React 18
        hasLoaded.current = true;

        const loadUser = async () => {
            console.log("🔥 Running useLoadUser");
            dispatch(setLoading(true));

            try {
                const res = await API.get("/auth/me");
                const user = res?.data?.user;
                console.log("🧑 Fetched user:", user);

                if (!user) {
                    console.warn("⚠️ No logged-in user. Clearing cart.");
                    // dispatch(setUser(null));
                    dispatch(setUser({ user: null, token: null }));
                    dispatch(clearCartLocal());
                    return;
                }

                // If a *different user* logged in → reset cart
                if (currentUser && currentUser.id !== user.id) {
                    dispatch(clearCartLocal());
                }

                // dispatch(setUser({ ...user }));
                dispatch(setUser({ user, token: localStorage.getItem("token") }));


                // Load cart (GET /cart now, no userId in route)
                try {
                    const cartRes = await API.get("/cart");
                    dispatch(setCart(cartRes.data));
                } catch (err) {
                    console.error("❌ Failed to load cart:", err);
                }
            } catch (error) {
                console.error("Failed to load user:", error);
                // dispatch(setUser(null));
                dispatch(setUser({ user: null, token: null }));
                dispatch(clearCartLocal());
            } finally {
                dispatch(setLoading(false));
            }
        };

        loadUser();
    }, [dispatch]); // Removed currentUser?_id to avoid rerenders
}
