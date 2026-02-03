import React, { useEffect, useState, useRef } from "react";
import { getOrders, updateOrderToDelivered, bulkDeliverOrders, updateOrderToShipped, cancelOrderByAdmin, undoCancelOrder } from "../../services/orderService";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import {
    getOrderStatus,
    getOrderStatusColor,
} from '@/utils/orderStatus.js';
import { useNavigate } from "react-router-dom";


const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    const [selectedOrders, setSelectedOrders] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const filterFromUrl = searchParams.get("status") || "ALL";

    const sortFromUrl = searchParams.get("sort") || "createdAt";
    const orderFromUrl = searchParams.get("order") || "desc";

    const [page, setPage] = useState(pageFromUrl);
    const [pages, setPages] = useState(1);
    const [filter, setFilter] = useState(filterFromUrl);
    const [sortField, setSortField] = useState(sortFromUrl);
    const [sortOrder, setSortOrder] = useState(orderFromUrl);
    const [confirmData, setConfirmData] = useState(null);
    const [showCancelled, setShowCancelled] = useState(false);
    const navigate = useNavigate();



    const actionStyles = {
        Delivered: "bg-green-600 hover:bg-green-700",
        Shipped: "bg-blue-600 hover:bg-blue-700",
        Cancelled: "bg-red-600 hover:bg-red-700",
    };


    const selectAllRef = useRef(null);

    const modalRef = useRef(null);

    const filteredOrders = orders
        .filter((o) => {
            if (!showCancelled && o.isCancelled) return false;

            if (filter === "PAID") return o.isPaid;
            if (filter === "UNPAID") return !o.isPaid;
            if (filter === "DELIVERED") return o.isDelivered;

            return true;
        })
        .sort((a, b) => {
            if (a.isCancelled && !b.isCancelled) return 1;
            if (!a.isCancelled && b.isCancelled) return -1;
            return 0;
        });


    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);

                const data = await getOrders({
                    page,
                    filter,
                    sort: sortField,
                    order: sortOrder,
                });

                setOrders(data.orders);
                setPages(data.pages);
            } catch {
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [page, filter, sortField, sortOrder]);

    useEffect(() => {
        const params = {};

        if (page > 1) params.page = page;
        if (filter !== "ALL") params.status = filter;
        if (sortField !== "createdAt") params.sort = sortField;
        if (sortOrder !== "desc") params.order = sortOrder;

        setSearchParams(params);
    }, [page, filter, sortField, sortOrder, setSearchParams]);

    useEffect(() => {
        if (!selectAllRef.current) return;

        const selectedCount = selectedOrders.length;
        const totalCount = filteredOrders.length;

        selectAllRef.current.indeterminate =
            selectedCount > 0 && selectedCount < totalCount;
    }, [selectedOrders, filteredOrders]);


    const handleStatusChange = (id, newStatus) => {
        setConfirmData({
            type: "single",
            orderId: id,
            action: newStatus,
        });
    };


    const confirmStatusChange = async () => {
        const { type, orderId, orderIds, action } = confirmData;

        try {
            setUpdatingOrderId(orderId || "bulk");

            // 🧠 SINGLE ORDER
            if (type === "single") {
                const order = orders.find(o => o._id === orderId);

                if ((action === "Delivered" || action === "Shipped") && !order.isPaid) {
                    toast.error(`Cannot ${action.toLowerCase()} an unpaid order`);
                    return;
                }

                if (action === "Delivered") {
                    await updateOrderToDelivered(orderId);
                }

                if (action === "Shipped") {
                    await updateOrderToShipped(orderId);
                }

                if (action === "Cancelled") {
                    await cancelOrderByAdmin(orderId);
                }

                // 🔁 UNDO CANCEL (NEW)
                if (action === "UndoCancel") {
                    await undoCancelOrder(orderId);
                }

                // ✅ SINGLE SOURCE OF TRUTH (UI update)
                setOrders(prev =>
                    prev.map(o =>
                        o._id === orderId
                            ? {
                                ...o,
                                orderStatus:
                                    action === "UndoCancel" ? "Processing" : action,
                                isDelivered: action === "Delivered",
                                isCancelled: action === "Cancelled" ? true : action === "UndoCancel" ? false : o.isCancelled,
                            }
                            : o
                    )
                );
            }


            // 🧠 BULK ACTION
            if (type === "bulk") {
                if (action === "Delivered") {
                    await bulkDeliverOrders(orderIds);

                    setOrders(prev =>
                        prev.map(o =>
                            orderIds.includes(o._id)
                                ? { ...o, isDelivered: true, orderStatus: "Delivered" }
                                : o
                        )
                    );

                    setSelectedOrders([]);
                }
            }

            toast.success(
                type === "bulk"
                    ? `Orders ${action.toLowerCase()} successfully`
                    : `Order ${action.toLowerCase()} successfully`
            );
        } catch (err) {
            toast.error(err.response?.data?.message || "Action failed");
        } finally {
            setConfirmData(null);
            setUpdatingOrderId(null);
        }
    };


    const handleBulkDeliver = async () => {
        const unpaidSelected = orders.some(
            o => selectedOrders.includes(o._id) && !o.isPaid
        );

        if (unpaidSelected) {
            toast.error("Some selected orders are unpaid");
            return;
        }

        try {
            await bulkDeliverOrders(selectedOrders);
            toast.success("Orders delivered");
            setOrders(prev =>
                prev.map(o =>
                    selectedOrders.includes(o._id)
                        ? { ...o, isDelivered: true }
                        : o
                )
            );
            setSelectedOrders([]);
        } catch {
            toast.error("Bulk update failed");
        }
    };

    const handleOverlayClick = (e) => {
        // 🚫 Don't close while processing
        if (updatingOrderId) return;

        // If click is outside modal box → close
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setConfirmData(null);
        }
    };


    if (loading)
        return <div className="flex justify-center py-20">
            <Loader2 className="animate-spin" size={30} />
        </div>;

    const isEmpty = !loading && filteredOrders.length === 0;


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6">Orders</h2>
            {/* <div className="flex gap-3 mb-4"> */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 mb-4">
                {["ALL", "PAID", "UNPAID", "DELIVERED"].map((type) => (
                    <button
                        key={type}
                        onClick={() => {
                            setPage(1);
                            setFilter(type);
                        }}
                        className={`cursor-pointer px-4 py-1.5 text-sm rounded-full border transition
        ${filter === type
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {selectedOrders.length > 0 && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-4">
                    <span className="text-sm text-gray-600">
                        {selectedOrders.length} orders selected
                    </span>

                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                setConfirmData({
                                    type: "bulk",
                                    orderIds: selectedOrders,
                                    action: "Delivered",
                                })
                            }
                            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded"
                        >
                            Mark Delivered
                        </button>


                        <button
                            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded"
                            onClick={() => toast.info("Bulk cancel coming next 👀")}
                        >
                            Cancel Orders
                        </button>

                    </div>
                </div>
            )}

            {!isEmpty && (
                <button
                    onClick={() => setShowCancelled(prev => !prev)}
                    className="px-4 py-1.5 text-sm rounded-md border hover:bg-gray-50"
                >
                    {showCancelled ? "Hide Cancelled" : "Show Cancelled"}
                </button>
            )}



            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0">
                {/* <table className="min-w-[900px] w-full text-sm table-fixed border-separate border-spacing-y-2"> */}
                <table className="w-full text-sm border-separate border-spacing-y-2 table-auto lg:table-fixed">


                    <colgroup>
                        <col className="w-[4%]" />   {/* checkbox */}
                        <col className="w-[6%]" />   {/* # */}
                        <col className="w-[10%]" />  {/* Date */}
                        <col className="w-[16%]" />  {/* User */}
                        <col className="w-[28%]" />  {/* Items (MOST IMPORTANT) */}
                        <col className="w-[8%]" />   {/* Total */}
                        <col className="w-[8%]" />   {/* Payment */}
                        <col className="w-[8%]" />   {/* Status */}
                        <col className="w-[12%]" />   {/* Actions */}
                    </colgroup>

                    {!isEmpty && (
                        <thead className="border-b">
                            <tr className="[&>th]:px-2 [&>th]:py-2 text-left">
                                {/* SELECT ALL CHECKBOX */}
                                <th className="px-2">
                                    <input
                                        ref={selectAllRef}
                                        type="checkbox"
                                        className="cursor-pointer"
                                        checked={
                                            filteredOrders.length > 0 &&
                                            selectedOrders.length === filteredOrders.length
                                        }
                                        onChange={(e) =>
                                            setSelectedOrders(
                                                e.target.checked ? filteredOrders.map(o => o._id) : []
                                            )
                                        }
                                    />
                                </th>

                                <th className="hidden sm:table-cell">#</th>

                                <th
                                    onClick={() => {
                                        setPage(1);
                                        setSortField("createdAt");
                                        setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
                                    }}
                                    className="cursor-pointer select-none whitespace-nowrap hidden sm:table-cell"
                                >
                                    Date{" "}
                                    <span className="ml-1 text-xs opacity-60">
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                </th>



                                <th>User</th>
                                <th>Items</th>
                                <th className="hidden sm:table-cell text-center">Total</th>
                                <th className="hidden md:table-cell text-center">Payment</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                    )}

                    {filteredOrders.length === 0 && !loading && (
                        <div className="w-full flex justify-center">
                            <div
                                className=" w-full text-gray-600 text-lg font-bold whitespace-nowrap">
                                No {filter !== "ALL" ? filter.toLowerCase() : ""} orders found
                            </div>
                        </div>
                    )}

                    <tbody>
                        {filteredOrders.map((o, i) => {
                            const status = getOrderStatus(o);

                            return (
                                <tr
                                    key={o._id}
                                    onClick={() => navigate(`/admin/orders/${o._id}`)}
                                    className={`cursor-pointer border-b transition
          ${o.isCancelled
                                            ? "bg-gray-100 text-gray-400 opacity-70 cursor-not-allowed"
                                            : "hover:bg-gray-50"
                                        }
        `}
                                >
                                    {/* checkbox */}
                                    <td className="px-2">
                                        <input
                                            type="checkbox"
                                            onClick={(e) => e.stopPropagation()}
                                            checked={selectedOrders.includes(o._id)}
                                            disabled={o.isCancelled}
                                            onChange={(e) => {
                                                setSelectedOrders(prev =>
                                                    e.target.checked
                                                        ? [...prev, o._id]
                                                        : prev.filter(id => id !== o._id)
                                                );
                                            }}
                                        />
                                    </td>

                                    <td className="hidden sm:table-cell font-medium text-gray-700">
                                        #{i + 1}
                                    </td>

                                    <td className="hidden sm:table-cell">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                                    <td>{o.user?.name || "Unknown User"}</td>

                                    {/* <td className="truncate">
                                        {Array.isArray(o.orderItems)
                                            ? o.orderItems.map(p => `${p.quantity}x ${p.name}`).join(", ")
                                            : "No products"}
                                    </td> */}
                                    <td className="max-w-[220px]">
                                        <span
                                            className="block truncate"
                                            title={
                                                Array.isArray(o.orderItems)
                                                    ? o.orderItems.map(p => `${p.quantity}x ${p.name}`).join(", ")
                                                    : ""
                                            }
                                        >
                                            {Array.isArray(o.orderItems)
                                                ? o.orderItems.map(p => `${p.quantity}x ${p.name}`).join(", ")
                                                : "No products"}
                                        </span>
                                    </td>


                                    <td className="hidden sm:table-cell text-center">₹{o.totalPrice ?? 0}</td>

                                    <td className="hidden sm:table-cell text-center">
                                        {o.isPaid ? (
                                            <Badge color="green" text="Paid" />
                                        ) : (
                                            <Badge color="red" text="Unpaid" />
                                        )}
                                    </td>

                                    {/* ✅ STATUS — single source of truth */}
                                    <td className="text-center">
                                        <span
                                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full
              ${getOrderStatusColor(status)}
            `}
                                        >
                                            {status}
                                        </span>
                                    </td>

                                    {/* actions */}
                                    <td className="min-w-[160px] text-center">
                                        <select
                                            value={status}
                                            onClick={(e) => e.stopPropagation()}
                                            disabled={o.isCancelled || updatingOrderId === o._id}
                                            onChange={(e) => handleStatusChange(o._id, e.target.value)}
                                            className="w-full max-w-[140px] px-3 py-1.5 text-sm border rounded-md"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered" disabled={!o.isPaid}>
                                                Delivered
                                            </option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>

                                        {o.isCancelled && (
                                            <button
                                                onClick={() => {
                                                    e.stopPropagation();
                                                    setConfirmData({
                                                        type: "single",
                                                        orderId: o._id,
                                                        action: "UndoCancel",
                                                    })
                                                }}
                                                className="mt-2 w-full px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                                            >
                                                Undo Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mt-6">
                {/* Page info */}
                <span className="text-sm text-gray-600">
                    {pages > 0 ? (
                        <>
                            Page <span className="font-medium">{page}</span> of{" "}
                            <span className="font-medium">{pages}</span>
                        </>
                    ) : (
                        "No pages"
                    )}
                </span>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    {/* Prev */}
                    <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page <= 1 || pages <= 1}
                        className="px-3 py-1.5 text-sm border rounded-md
             disabled:opacity-50 disabled:cursor-not-allowed
             hover:bg-gray-50"
                    >
                        Prev
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: pages }, (_, i) => i + 1)
                        .filter(p =>
                            p === 1 ||
                            p === pages ||
                            Math.abs(p - page) <= 1
                        )
                        .map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-3 py-1.5 text-sm border rounded-md ${p === page
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "hover:bg-gray-50"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                    {/* Next */}
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= pages || pages <= 1}
                        className="px-3 py-1.5 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {confirmData && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onMouseDown={handleOverlayClick}
                >
                    <div
                        ref={modalRef}
                        className="
        bg-white rounded-xl shadow-lg w-full max-w-sm p-6
        transform transition-all duration-200
        scale-100 opacity-100
      "
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold mb-2">
                            Confirm {confirmData.action}
                        </h3>

                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to{" "}
                            <span className="font-medium">
                                {confirmData.action.toLowerCase()}
                            </span>{" "}
                            {confirmData.type === "bulk"
                                ? `${confirmData.orderIds.length} orders`
                                : "this order"}
                            ?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmData(null)}
                                disabled={!!updatingOrderId}
                                className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmStatusChange}
                                disabled={!!updatingOrderId}
                                className={`px-4 py-2 text-sm text-white rounded-md transition
            ${actionStyles[confirmData.action]}
            ${updatingOrderId ? "opacity-60 cursor-not-allowed" : ""}
          `}
                            >
                                {updatingOrderId ? "Processing..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

const Badge = ({ color, text }) => {
    const styles = {
        green: "bg-green-100 text-green-700",
        red: "bg-red-100 text-red-700",
        yellow: "bg-yellow-100 text-yellow-700",
    };

    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[color]}`}>
            {text}
        </span>
    );
};



export default OrderList;
