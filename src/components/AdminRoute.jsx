import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Wait for user info to finish loading before deciding
  if (loading) {
    return (
      <div className="
  flex flex-col justify-center items-center
  h-screen
  px-4
  text-gray-600
">
        <p className="
    text-base
    sm:text-lg
    md:text-xl
    lg:text-xl
    xl:text-xl
    2xl:text-2xl
    font-medium
    text-center
  ">
          Checking admin access...
        </p>
      </div>

    );
  }

  // If user not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user logged in but not admin
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin verified — allow access
  return children;
};

export default AdminRoute;
