import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiCreditCard, FiPackage } from "react-icons/fi";
import { motion } from "framer-motion";
import axiosSecure from "../../../utils/axiosSecure";
import { useAuth } from "../../../context/AuthProvider";
import DashboardStatCard from "../../../components/dashboard/DashboardStatCard";
import PageHeader from "../../../components/dashboard/PageHeader";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const statusColor = {
  Pending: "badge-warning",
  Accepted: "badge-info",
  Processing: "badge-primary",
  Shipped: "badge-secondary",
  Delivered: "badge-success",
  Cancelled: "badge-error",
};

const BuyerOverview = () => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["buyerOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/buyer/overview");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.displayName?.split(" ")[0]}! 👋`}
        subtitle="Here's what's happening with your account"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <DashboardStatCard icon={<FiShoppingCart />} title="Total Orders" value={data?.totalOrders || 0} color="primary" delay={0} />
        <DashboardStatCard icon={<FiHeart />} title="Wishlist Count" value={data?.wishlistCount || 0} color="error" delay={0.1} />
        <DashboardStatCard icon={<FiCreditCard />} title="Total Spent" value={`৳${(data?.totalSpent || 0).toLocaleString()}`} color="success" delay={0.2} />
      </div>

      {/* Recent Purchases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-custom overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-base-200">
          <h2 className="font-display font-semibold text-base-content">Recent Orders</h2>
          <Link to="/dashboard/my-orders" className="text-primary text-sm font-medium hover:underline">
            View All →
          </Link>
        </div>

        {!data?.recentOrders?.length ? (
          <div className="p-8 text-center text-base-content/40">
            <FiPackage size={36} className="mx-auto mb-2" />
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr className="text-base-content/50 text-xs uppercase">
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-base-200/50">
                    <td className="font-medium text-sm text-base-content max-w-[180px] truncate">{order.productTitle}</td>
                    <td className="text-primary font-semibold text-sm">৳{order.amount?.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-sm ${statusColor[order.orderStatus] || "badge-ghost"}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="text-base-content/40 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-BD")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BuyerOverview;
