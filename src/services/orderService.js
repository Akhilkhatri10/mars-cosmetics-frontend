import API from "./api";

export const getOrders = async ({
  page = 1,
  filter = "ALL",
  sort = "createdAt",
  order = "desc",
} = {}) => {
  const { data } = await API.get("/orders", {
    params: {
      page,
      sort,
      order,
      status: filter !== "ALL" ? filter : undefined,
    },
  });

  return data;
};


export const updateOrderToDelivered = async (id) => {
  return await API.put(`/orders/${id}/deliver`);
};

// Ship order (admin)
export const updateOrderToShipped = async (id) => {
  return await API.put(`/orders/${id}/ship`);
};

// Cancel order by admin
export const cancelOrderByAdmin = async (id) => {
  return await API.delete(`/orders/${id}/admin-cancel`);
};

// Undo cancel order by admin
export const undoCancelOrder = async (id) => {
  return await API.put(`/orders/${id}/undo-cancel`);
};

// Bulk deliver orders (admin)
export const bulkDeliverOrders = async (orderIds) => {
  return await API.put("/orders/bulk-deliver", { orderIds });
};

// Optional: If admin can mark as paid too
export const updateOrderToPaid = async (id) => {
  return await API.put(`/orders/${id}/pay`);
};
