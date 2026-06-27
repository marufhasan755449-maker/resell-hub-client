import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiEye, FiXCircle } from "react-icons/fi";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import EmptyState from "../../../components/dashboard/EmptyState";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const statusColor = {
  Pending: "badge-warning",
  Accepted: "badge-info",
  Processing: "badge-primary",
  Shipped: "badge-secondary",
  Delivered: "badge-success",
  Cancelled: "badge-error",
};

const MyOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/orders/my-orders");
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (orderId) => {
      await axiosSecure.patch(`/api/orders/${orderId}/cancel`);
    },
    onSuccess: () => {
      toast.success("Order cancelled!");
      queryClient.invalidateQueries(["myOrders"]);
    },
    onError: () => toast.error("Cannot cancel this order"),
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader title="My Orders" subtitle={`${orders.length} total orders`} />

      {orders.length === 0 ? (
        <EmptyState emoji="🛒" title="No orders yet" desc="Browse products and place your first order!" btnLabel="Shop Now" btnTo="/products" />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-custom overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base-content/50 text-xs uppercase bg-base-200">
                  <th>#</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={order._id} className="hover:bg-base-200/40 transition-colors">
                    <td className="text-base-content/40 text-sm">{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-base-200 shrink-0">
                          <img src={order.productImage || "https://placehold.co/40"} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-sm text-base-content max-w-[160px] truncate">{order.productTitle}</span>
                      </div>
                    </td>
                    <td className="font-semibold text-primary">৳{order.amount?.toLocaleString()}</td>
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
                    <td className="text-base-content/40 text-xs whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-BD")}
                    </td>
                    <td>
                      {order.orderStatus === "Pending" && (
                        <button
                          onClick={() => cancelMutation.mutate(order._id)}
                          disabled={cancelMutation.isPending}
                          className="btn btn-error btn-xs rounded-lg gap-1"
                        >
                          <FiXCircle size={12} /> Cancel
                        </button>
                      )}
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

export default MyOrders;
