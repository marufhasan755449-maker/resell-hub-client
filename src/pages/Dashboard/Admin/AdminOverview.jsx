import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiPackage, FiShoppingCart, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";
import axiosSecure from "../../../utils/axiosSecure";
import DashboardStatCard from "../../../components/dashboard/DashboardStatCard";
import PageHeader from "../../../components/dashboard/PageHeader";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const AdminOverview = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/overview");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Full platform overview" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardStatCard icon={<FiUsers />} title="Total Users" value={data?.totalUsers || 0} color="primary" delay={0} />
        <DashboardStatCard icon={<FiPackage />} title="Total Products" value={data?.totalProducts || 0} color="success" delay={0.1} />
        <DashboardStatCard icon={<FiShoppingCart />} title="Total Orders" value={data?.totalOrders || 0} color="warning" delay={0.2} />
        <DashboardStatCard icon={<FiDollarSign />} title="Total Revenue" value={`৳${(data?.totalRevenue || 0).toLocaleString()}`} color="violet" delay={0.3} />
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card-custom overflow-hidden">
          <div className="p-5 border-b border-base-200 font-display font-semibold">Recent Users</div>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead><tr className="text-base-content/40 text-xs uppercase"><th>Name</th><th>Role</th><th>Status</th></tr></thead>
              <tbody>
                {(data?.recentUsers || []).map((u) => (
                  <tr key={u._id} className="hover:bg-base-200/40">
                    <td>
                      <div className="flex items-center gap-2">
                        <img src={u.photo || `https://ui-avatars.com/api/?name=${u.name}&size=32&background=0ea5e9&color=fff`} className="w-7 h-7 rounded-full" alt="" />
                        <span className="text-sm font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td><span className={`badge badge-sm ${u.role === "admin" ? "badge-error" : u.role === "seller" ? "badge-warning" : "badge-success"}`}>{u.role}</span></td>
                    <td><span className={`badge badge-sm ${u.status === "active" ? "badge-success" : "badge-error"}`}>{u.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-custom overflow-hidden">
          <div className="p-5 border-b border-base-200 font-display font-semibold">Recent Products</div>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead><tr className="text-base-content/40 text-xs uppercase"><th>Product</th><th>Price</th><th>Status</th></tr></thead>
              <tbody>
                {(data?.recentProducts || []).map((p) => (
                  <tr key={p._id} className="hover:bg-base-200/40">
                    <td className="font-medium text-sm max-w-[160px] truncate">{p.title}</td>
                    <td className="text-primary font-semibold text-sm">৳{p.price?.toLocaleString()}</td>
                    <td><span className={`badge badge-sm ${p.status === "available" ? "badge-success" : "badge-ghost"}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOverview;
