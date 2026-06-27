import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FiPackage, FiTrendingUp, FiDollarSign, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import axiosSecure from "../../../utils/axiosSecure";
import DashboardStatCard from "../../../components/dashboard/DashboardStatCard";
import PageHeader from "../../../components/dashboard/PageHeader";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const statusColor = {
  Pending: "badge-warning",
  Accepted: "badge-info",
  Processing: "badge-primary",
  Delivered: "badge-success",
  Cancelled: "badge-error",
};

const SellerOverview = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["sellerOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/seller/overview");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader
        title="Seller Dashboard"
        subtitle="Track your sales and manage your listings"
        action={
          <Link to="/dashboard/add-product" className="btn btn-primary btn-sm rounded-xl text-white gap-1">
            + Add Product
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardStatCard icon={<FiPackage />} title="Total Products" value={data?.totalProducts || 0} color="primary" delay={0} />
        <DashboardStatCard icon={<FiTrendingUp />} title="Total Sales" value={data?.totalSales || 0} color="success" delay={0.1} />
        <DashboardStatCard icon={<FiDollarSign />} title="Total Revenue" value={`৳${(data?.totalRevenue || 0).toLocaleString()}`} color="warning" delay={0.2} />
        <DashboardStatCard icon={<FiClock />} title="Pending Orders" value={data?.pendingOrders || 0} color="error" delay={0.3} />
      </div>

      {/* Recent Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card-custom overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-base-200">
          <h2 className="font-display font-semibold text-base-content">Recent Orders</h2>
          <Link to="/dashboard/manage-orders" className="text-primary text-sm font-medium hover:underline">View All →</Link>
        </div>

        {!data?.recentOrders?.length ? (
          <div className="p-8 text-center text-base-content/40">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr className="text-base-content/50 text-xs uppercase">
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-base-200/40">
                    <td className="font-medium text-sm max-w-[150px] truncate">{order.productTitle}</td>
                    <td className="text-sm text-base-content/60">{order.buyerInfo?.name}</td>
                    <td className="font-semibold text-primary text-sm">৳{order.amount?.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-sm ${statusColor[order.orderStatus] || "badge-ghost"}`}>
                        {order.orderStatus}
                      </span>
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

export default SellerOverview;
