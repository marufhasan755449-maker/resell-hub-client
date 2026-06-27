import { useQuery } from "@tanstack/react-query";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { motion } from "framer-motion";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e"];

// Fake data fallback
const fakeMonthly = [
  { month: "Jan", sales: 4, revenue: 48000 },
  { month: "Feb", sales: 7, revenue: 92000 },
  { month: "Mar", sales: 5, revenue: 61000 },
  { month: "Apr", sales: 9, revenue: 115000 },
  { month: "May", sales: 6, revenue: 78000 },
  { month: "Jun", sales: 11, revenue: 142000 },
];

const fakeTopProducts = [
  { name: "Dell Laptop", sales: 5 },
  { name: "iPhone 13", sales: 3 },
  { name: "Sony TV", sales: 4 },
  { name: "Samsung Phone", sales: 7 },
  { name: "Office Chair", sales: 2 },
];

const SalesAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["salesAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/seller/analytics");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  const monthly = data?.monthly?.length ? data.monthly : fakeMonthly;
  const topProducts = data?.topProducts?.length ? data.topProducts : fakeTopProducts;

  return (
    <div>
      <PageHeader title="Sales Analytics" subtitle="Visual overview of your seller performance" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-custom p-5">
          <h3 className="font-display font-semibold text-base-content mb-4">Monthly Revenue (৳)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(val) => [`৳${val.toLocaleString()}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Sales Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-custom p-5">
          <h3 className="font-display font-semibold text-base-content mb-4">Monthly Sales Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Selling Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-custom p-5">
          <h3 className="font-display font-semibold text-base-content mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="sales" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sales Distribution Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-custom p-5">
          <h3 className="font-display font-semibold text-base-content mb-4">Sales by Product</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={topProducts} dataKey="sales" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {topProducts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
