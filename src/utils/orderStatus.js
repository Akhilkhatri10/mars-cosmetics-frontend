// src/utils/orderStatus.js

export const getOrderStatus = (order) => {
  if (order.isCancelled) return "Cancelled";
  if (order.isDelivered) return "Delivered";
  if (order.shippingStatus === "Shipped") return "Shipped";
  if (order.isPaid) return "Processing";
  return "Unpaid";
};

export const getOrderStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Processing":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-gray-200 text-gray-500";
    case "Unpaid":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
