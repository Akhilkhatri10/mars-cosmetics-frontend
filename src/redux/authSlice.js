import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      const { user, token } = action.payload || {};

      // update user
      state.user = user
        ? {
          ...user,
          _id: user._id || user.id, // 🔥 normalize ID
        }
        : null;

      // update token only when provided
      // if (token !== undefined) {
      //   state.token = token;
      // }
      state.token = token || null;

      // authenticated only when user exists
      state.isAuthenticated = !!state.user;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, logout, setError } = authSlice.actions;
export default authSlice.reducer;
