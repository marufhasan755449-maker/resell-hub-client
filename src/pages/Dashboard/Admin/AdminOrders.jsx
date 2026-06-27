import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const statusColor = { Pending: "badge-warning", Accepted: "badge-info", Processing: "badge-primary", Shipped: "badge-secondary", Delivered: "badge-success", Cancelled: "badge-error" };
const allStatuses = ["Pending", "Accepted", "Processing", "Shipped", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/orders");
      return res.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => axiosSecure.patch(`/api/orders/${id}/status`, { status }),
    onSuccess: () => { toast.success("Order updated!"); queryClient.invalidateQueries(["adminOrders"]); },
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader title="All Orders" subtitle={`${orders.length} total orders`} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-custom overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-base-content/50 text-xs uppercase bg-base-200">
                <th>Product</th>
                <th>Buyer</th>
                <th>Seller</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-base-200/40">
                  <td className="font-medium text-sm max-w-[140px] truncate">{order.productTitle}</td>
                  <td className="text-sm text-base-content/60">{order.buyerInfo?.name}</td>
                  <td className="text-sm text-base-content/60">{order.sellerInfo?.name}</td>
                  <td className="font-semibold text-primary text-sm">৳{order.amount?.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-sm ${order.paymentStatus === "paid" ? "badge-success" : "badge-warning"}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-sm ${statusColor[order.orderStatus] || "badge-ghost"}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateStatus.mutate({ id: order._id, status: e.target.value })}
                      className="select select-bordered select-xs rounded-lg"
                    >
                      {allStatuses.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOrders;
