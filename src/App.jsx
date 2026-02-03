import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import AboutUs from './pages/AboutUs'
import Blog from './pages/Blog'
import ContactUs from './pages/ContactUs'
import Orders from './pages/Orders'
import AdminRoute from './components/AdminRoute'
import AdminLayout from './pages/Admin/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import AddProduct from './pages/Admin/AddProduct'
import ProductList from './pages/Admin/ProductList'
import useLoadUser from './hooks/useLoadUser'
import EditProduct from './pages/Admin/EditProduct'
import OrderList from './pages/Admin/OrderList'
import OrderDetails from './pages/OrderDetails'
import ProductsPage from './pages/ProductsPage'
import ProductDescription from './pages/ProductDescription'
import ShadeSelector from './pages/ShadeSelector'
import Checkout from "./pages/Checkout";
import BlogDetail from './pages/BlogDetail'
import Customers from './pages/Admin/Customers'
import PolicyPage from './pages/PolicyPage'


import RootLayout from "./layouts/RootLayout";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 👈 router context starts here
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "blogs", element: <Blog /> },
      { path: "blogs/:id", element: <BlogDetail /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "orders", element: <Orders /> },
      { path: "orders/:id", element: <OrderDetails /> },
      { path: "products/:category", element: <ProductsPage /> },
      { path: "products/:category/:id", element: <ProductDescription /> },
      { path: "shade", element: <ShadeSelector /> },
      { path: "checkout", element: <Checkout /> },
      { path: "policies/:policySlug", element: <PolicyPage /> },

      // -------- ADMIN --------
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "products", element: <ProductList /> },
          { path: "edit-product/:id", element: <EditProduct /> },
          { path: "orders", element: <OrderList /> },
          { path: "customers", element: <Customers /> },
          { path: "orders/:id", element: <OrderDetails /> },
        ],
      },
    ],
  },
]);


// const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },

//   {
//     path: '/register',
//     element: <Register />
//   },

//   {
//     path: '/login',
//     element: <Login />
//   },

//   {
//     path: '/about-us',
//     element: <AboutUs />
//   },

//   {
//     path: '/blogs',
//     element: <Blog />
//   },

//   {
//     path: '/blogs/:id',
//     element: <BlogDetail />
//   },

//   {
//     path: '/contact-us',
//     element: <ContactUs />
//   },

//   {
//     path: '/orders',
//     element: <Orders />
//   },

//   {
//     path: "/orders/:id",
//     element: <OrderDetails />
//   },

//   {
//     path: '/products/:category',
//     element: <ProductsPage />
//   },
//   // {
//   //   path: '/description',
//   //   element: <ProductDescription />
//   // }
//   {
//     path: '/products/:category/:id',
//     element: <ProductDescription />
//   },
//   {
//     path: '/shade',
//     element: <ShadeSelector />
//   },
//   {
//     path: '/checkout',
//     element: <Checkout />
//   },
//   {
//     path: "/policies/:policySlug",
//     element: <PolicyPage />
//   },

//   // ---------------- ADMIN ROUTES ----------------
//   {
//     path: '/admin',
//     element: (
//       <AdminRoute>
//         <AdminLayout />
//       </AdminRoute>
//     ),
//     children: [
//       {
//         path: 'dashboard',
//         element: <Dashboard />
//       },
//       {
//         path: 'add-product',
//         element: <AddProduct />
//       },
//       {
//         path: 'products',
//         element: <ProductList />
//       },
//       {
//         path: "edit-product/:id",
//         element: <EditProduct />
//       },
//       {
//         path: "orders",
//         element: <OrderList />
//       },
//       {
//         path: "customers",
//         element: <Customers />
//       },
//       {
//         path: "orders/:id",
//         element: <OrderDetails />
//       }

//     ]
//   }
// ])


function App() {

  useLoadUser();

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
