import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Box,
  PlusSquare,
  Users,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);        // desktop
  const [mobileOpen, setMobileOpen] = useState(false); // mobile

  return (
    <div className="flex bg-gray-100">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`
          hidden lg:flex
          bg-gray-900 text-white shadow-xl
          flex-col duration-300
          sticky top-0 h-screen
          ${open ? "w-64" : "w-20"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5">
          {open && <h1 className="text-xl font-bold">Admin Panel</h1>}

          <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2 px-3">
          <SidebarItem to="dashboard" label="Dashboard" icon={<Home size={20} />} open={open} />
          <SidebarItem to="products" label="Products" icon={<Box size={20} />} open={open} />
          <SidebarItem to="add-product" label="Add Product" icon={<PlusSquare size={20} />} open={open} />
          <SidebarItem to="orders" label="Orders" icon={<ShoppingCart size={20} />} open={open} />
          <SidebarItem to="customers" label="Customers" icon={<Users size={20} />} open={open} />
        </nav>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`
          lg:hidden
          fixed top-0 left-0 h-screen w-64
          bg-gray-900 text-white shadow-xl
          z-40 duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between p-5">
          <h1 className="text-xl font-bold">Admin Panel</h1>

          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-3">
          <SidebarItem
            to="dashboard"
            label="Dashboard"
            icon={<Home size={20} />}
            open
            onItemClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="products"
            label="Products"
            icon={<Box size={20} />}
            open
            onItemClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="add-product"
            label="Add Product"
            icon={<PlusSquare size={20} />}
            open
            onItemClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="orders"
            label="Orders"
            icon={<ShoppingCart size={20} />}
            open
            onItemClick={() => setMobileOpen(false)}
          />
          <SidebarItem
            to="customers"
            label="Customers"
            icon={<Users size={20} />}
            open
            onItemClick={() => setMobileOpen(false)}
          />
        </nav>

      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}
      <main className="flex-1 h-screen overflow-y-auto p-8">

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden mb-4 p-2 bg-gray-900 text-white rounded-lg"
        >
          <Menu size={20} />
        </button>

        <Outlet />
      </main>
    </div>
  );
}

// function SidebarItem({ to, label, icon, open }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 p-3 rounded-lg transition-all
//         ${isActive ? "bg-indigo-600" : "hover:bg-gray-800"}`
//       }
//     >
//       {icon}
//       {open && <span className="text-sm font-medium">{label}</span>}
//     </NavLink>
//   );
// }


function SidebarItem({ to, label, icon, open, onItemClick }) {
  return (
    <NavLink
      to={to}
      onClick={onItemClick}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg transition-all
        ${isActive ? "bg-indigo-600" : "hover:bg-gray-800"}`
      }
    >
      {icon}
      {open && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
}

