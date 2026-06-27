import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiTruck } from "react-icons/fi";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import EmptyState from "../../../components/dashboard/EmptyState";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const statusFlow = ["Pending", "Accepted", "Processing", "Shipped", "Delivered"];
const statusColor = { Pending: "badge-warning", Accepted: "badge-info", Processing: "badge-primary", Shipped: "badge-secondary", Delivered: "badge-success", Cancelled: "badge-error" };

const ManageOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["sellerOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/seller/orders");
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }) => axiosSecure.patch(`/api/orders/${id}/status`, { status }),
    onSuccess: () => { toast.success("Order updated!"); queryClient.invalidateQueries(["sellerOrders"]); },
    onError: () => toast.error("Update failed"),
  });

  const nextStatus = (current) => {
    const idx = statusFlow.indexOf(current);
    return idx < statusFlow.length - 1 ? statusFlow[idx + 1] : null;
  };

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader title="Manage Orders" subtitle={`${orders.length} total orders`} />

      {orders.length === 0 ? (
        <EmptyState emoji="📋" title="No orders yet" desc="Orders from buyers will appear here" />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-custom overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base-content/50 text-xs uppercase bg-base-200">
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-base-200/40">
                    <td className="font-medium text-sm max-w-[160px] truncate">{order.productTitle}</td>
                    <td>
                      <div>
                        <p className="text-sm font-medium">{order.buyerInfo?.name}</p>
                        <p className="text-xs text-base-content/40">{order.buyerInfo?.email}</p>
                      </div>
                    </td>
                    <td className="font-semibold text-primary">৳{order.amount?.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-sm ${statusColor[order.orderStatus] || "badge-ghost"}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="text-xs text-base-content/40 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-BD")}
                    </td>
                    <td>
                      <div className="flex gap-1 flex-wrap">
                        {/* Accept / advance status */}
                        {nextStatus(order.orderStatus) && order.orderStatus !== "Cancelled" && (
                          <button
                            onClick={() => updateMutation.mutate({ id: order._id, status: nextStatus(order.orderStatus) })}
                            disabled={updateMutation.isPending}
                            className="btn btn-success btn-xs rounded-lg gap-1"
                          >
                            {order.orderStatus === "Pending" ? <><FiCheck size={11} /> Accept</> : <><FiTruck size={11} /> {nextStatus(order.orderStatus)}</>}
                          </button>
                        )}
                        {/* Reject — only from Pending */}
                        {order.orderStatus === "Pending" && (
                          <button
                            onClick={() => updateMutation.mutate({ id: order._id, status: "Cancelled" })}
                            className="btn btn-error btn-xs rounded-lg gap-1"
                          >
                            <FiX size={11} /> Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ManageOrders;
