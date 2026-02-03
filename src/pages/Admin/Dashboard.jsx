import { useEffect, useMemo, useState } from 'react';
import {
  Users,
  ShoppingCart,
  Menu,
  Search,
  Bell,
  DollarSign,
  Package,
} from 'lucide-react';
// import axios from "../../axiosConfig.js";
import API from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import {
  getOrderStatus,
  getOrderStatusColor,
} from '@/utils/orderStatus.js';


// ---------- Small helper components ----------
const IconWrapper = ({ children }) => (
  <div className="p-3 bg-white/10 rounded-xl">{children}</div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white shadow rounded-lg p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
    </div>
    <div>{icon}</div>
  </div>
);



// ---------- Main Admin Panel ----------
export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [overview, setOverview] = useState({
    totalSales: 0,
    orders: 0,
    customers: 0,
  });
  const [salesData, setSalesData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [overviewRes, salesRes, ordersRes, productsRes] =
          await Promise.all([
            API.get("/admin/overview"),
            API.get("/admin/sales"),
            API.get("/admin/orders"),
            API.get("/admin/products"),
          ]);

        // console.log("Products API response:", productsRes.data);
        console.log("Admin orders response:", ordersRes.data);

        setOverview(overviewRes.data);
        setSalesData(salesRes.data);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Admin dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  // const filteredOrders = useMemo(() => {
  //   if (!query) return orders;

  //   return orders.filter((o) => {
  //     const orderNo = String(o.orderNumber || "");
  //     const name = o.user?.name || "";

  //     return (
  //       orderNo.toLowerCase().includes(query.toLowerCase()) ||
  //       name.toLowerCase().includes(query.toLowerCase())
  //     );
  //   });
  // }, [orders, query]);

  const filteredOrders = useMemo(() => {
    if (!query) return orders;

    const q = query.toLowerCase();

    return orders.filter((o) => {
      const orderNo = String(o.orderNumber || "").toLowerCase();
      const customer = (o.customer || "").toLowerCase();

      return (
        orderNo.includes(q) ||
        customer.includes(q)
      );
    });
  }, [orders, query]);



  const handleLogout = async () => {
    try {
      await API.post("/auth/logout"); // optional: clears cookie
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };


  return (
    // <div className="min-h-screen flex text-gray-800">
    <div className="min-h-screen flex text-gray-800 w-full max-w-full overflow-x-hidden">

      {/* <div className="flex-1 p-6"> */}
      <div className="flex-1 sm:p-6 2xl:p-10 w-full max-w-full overflow-x-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh] text-gray-500">
            Loading dashboard...
          </div>
        ) : (
          <>
            {/* Topbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              {/* <div className="flex items-center gap-4">
                <button className="md:hidden p-2 rounded-md bg-white shadow" onClick={() => setCollapsed(false)}>
                  <Menu size={18} />
                </button>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className="text-sm text-gray-500">Overview of recent activity</p>
              </div> */}

              <div className="flex items-center gap-4">

                <h2 className="text-2xl font-bold">Dashboard</h2>

                {/* hide on mobile */}
                <p className="hidden md:block text-sm text-gray-500">
                  Overview of recent activity
                </p>
              </div>


              <div className="flex items-center gap-3">
                {/* <div className="hidden sm:flex items-center gap-2 bg-white border rounded-lg px-3 py-1">
                  <Search size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search orders or customers"
                    className="outline-none text-sm w-44"
                  />
                </div> */}
                <div className="hidden sm:flex items-center gap-2 bg-white border rounded-lg px-3 py-1">
                  <Search size={16} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="outline-none text-sm w-44 md:w-56 2xl:w-72"
                    placeholder="Search orders or customers"
                  />
                </div>


                {/* <div className="relative">
                  <button className="p-2 rounded-md bg-white shadow">
                    <Bell size={16} />
                  </button>

                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </div> */}

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">Akhilesh</div>
                    <div className="text-xs text-gray-500">Admin</div>
                  </div>
                  <div className="relative">
                    <div
                      onClick={() => setShowMenu((prev) => !prev)}
                      className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white cursor-pointer select-none"
                    >
                      A
                    </div>

                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-md">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 w-full mb-6">
              <StatCard
                title="Total Sales"
                value={`₹${toLocaleNumber(overview.totalSales)}`}
                icon={<IconWrapper><DollarSign size={26} /></IconWrapper>}
              />

              <Link to="/admin/orders">
                <StatCard
                  title="Orders"
                  value={overview.orders}
                  className="cursor-pointer hover:shadow-lg hover:scale-[1.01] transition"
                  icon={<IconWrapper><ShoppingCart size={26} /></IconWrapper>}
                />
              </Link>

              <Link to="/admin/customers">
                <StatCard
                  title="Customers"
                  value={overview.customers}
                  className="cursor-pointer hover:shadow-lg hover:scale-[1.01] transition"
                  icon={<IconWrapper><Users size={26} /></IconWrapper>}
                />
              </Link>

              <Link to="/admin/products">
                <StatCard
                  title="Products"
                  value={overview.products}
                  className="cursor-pointer hover:shadow-lg hover:scale-[1.01] transition"
                  icon={<IconWrapper><Package size={26} /></IconWrapper>}
                />
              </Link>
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-lg p-4 shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Sales (last 6 months)</h3>
                  {/* <span className="text-xs text-gray-400">
                    Live data
                  </span> */}
                  {/* <div className="text-sm text-gray-500">Revenue trends</div> */}
                </div>
                {/* <div style={{ width: '100%', height: 280 }}> */}
                {/* <div className="w-full h-[220px] sm:h-[260px] lg:h-[280px] 2xl:h-[320px]"> */}
                <div className="w-full max-w-full h-[220px] sm:h-[260px] lg:h-[280px] 2xl:h-[320px] overflow-hidden">
                  {salesData.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-sm text-gray-400">
                      No sales data available
                    </div>
                  ) : (
                    <ResponsiveContainer>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        {/* <YAxis /> */}
                        <YAxis
                          tickFormatter={(v) =>
                            v >= 1000 ? `₹${v / 1000}k` : `₹${v}`
                          }
                        />
                        <Tooltip formatter={(v) => `₹${v}`} />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#6366f1"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow">
                <h3 className="font-semibold mb-3">Top Products</h3>

                <ul className="space-y-3">
                  {products.length === 0 ? (
                    <li className="text-sm text-gray-500 text-center py-6">
                      No products found
                    </li>
                  ) : (
                    products.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center justify-between border-b last:border-b-0 pb-2"
                      >
                        <div>
                          {/* <div className="font-medium">{p.title}</div> */}
                          <div className="font-medium truncate sm:whitespace-normal">
                            {p.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Stock: {p.stock}
                          </div>
                        </div>

                        <div className="text-sm font-semibold">
                          ₹{p.price}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            {/* Orders Table */}
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Orders</h3>
                <div className="text-sm text-gray-500">Showing latest 10 orders</div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="text-xs uppercase text-gray-500">
                    <tr>
                      <th className="px-4 md:px-7 py-2">Order</th>
                      <th className="px-4 md:px-7 py-2">Customer</th>
                      <th className="px-4 md:px-7 py-2">Date</th>
                      <th className="px-4 md:px-7 py-2">Total</th>
                      <th className="px-4 md:px-7 py-2">Status</th>
                      <th className="px-4 md:px-7 py-2">Action</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-gray-500">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o, index) => {
                        const status = getOrderStatus(o);
                        return (
                          <tr key={o.id} className="border-t">
                            <td className="px-10 py-3 font-medium">{index + 1}</td>
                            <td className="px-4 py-3">{o.customer}</td>
                            <td className="px-4 py-3">{o.date}</td>
                            <td className="px-4 py-3">₹{o.total}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs ${getOrderStatusColor(status)}`}
                              >
                                {status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => navigate(`/admin/orders/${o._id}`)}
                                className="cursor-pointer bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    )
                    }
                  </tbody> */}

                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-6 text-gray-500"
                        >
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o, index) => {
                        const status = getOrderStatus(o);

                        return (
                          <tr key={o.id} className="border-t">
                            <td className="px-3 md:px-6 lg:px-10 py-3 font-medium">
                              {index + 1}
                            </td>

                            <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                              {o.customer}
                            </td>

                            <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                              {o.date}
                            </td>

                            <td className="px-3 md:px-4 py-3 whitespace-nowrap">
                              ₹{o.total}
                            </td>

                            <td className="px-3 md:px-4 py-3">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs ${getOrderStatusColor(status)}`}
                              >
                                {status}
                              </span>
                            </td>

                            <td className="px-3 md:px-4 py-3">
                              <button
                                onClick={() => navigate(`/admin/orders/${o._id}`)}
                                className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>


                </table>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center text-xs sm:text-sm text-gray-500">© {new Date().getFullYear()} Mars Cosmetics — Admin</footer>
          </>
        )}
      </div>
    </div>
  );
}

// ---------- Small subcomponents & helpers below ----------
function NavItem({ icon, label, collapsed }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
      <div className="text-gray-600">{icon}</div>
      {!collapsed && <div className="font-medium text-gray-700">{label}</div>}
    </div>
  );
}

function toLocaleNumber(num) {
  try {
    return Number(num).toLocaleString('en-IN');
  } catch (e) {
    return num;
  }
}
