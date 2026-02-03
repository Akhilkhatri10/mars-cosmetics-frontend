import { createSlice } from "@reduxjs/toolkit";

const calcTotals = (state) => {
  state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
  state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    // 🟢 Replace with backend cart
    setCart: (state, action) => {
      state.items = (action.payload.items || []).map((item) => ({
        id:
          typeof item.product === "object"
            ? item.product._id
            : item.product,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      }));
      calcTotals(state);
      state.loading = false;
      state.error = null;
    },

    // 🟡 Optimistic local update
    addToCartLocal: (state, action) => {
      const p = action.payload;
      const existing = state.items.find((item) => item.id === p.id);

      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ ...p, quantity: 1 });
      }

      calcTotals(state);
    },

    increaseQtyLocal: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity++;
      calcTotals(state);
    },

    decreaseQtyLocal: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
      calcTotals(state);
    },

    removeItemLocal: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      calcTotals(state);
    },

    clearCartLocal: (state) => {
      state.items = [];
      calcTotals(state);
    },
  },
});

export const {
  setCart,
  setLoading,
  setError,
  addToCartLocal,
  increaseQtyLocal,
  decreaseQtyLocal,
  removeItemLocal,
  clearCartLocal,
} = cartSlice.actions;

export default cartSlice.reducer;
