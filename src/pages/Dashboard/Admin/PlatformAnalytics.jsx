import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#f43f5e", "#06b6d4"];

const fakeUserGrowth = [
  { month: "Jan", users: 45 }, { month: "Feb", users: 72 }, { month: "Mar", users: 60 },
  { month: "Apr", users: 110 }, { month: "May", users: 95 }, { month: "Jun", users: 140 },
];
const fakeMonthlyOrders = [
  { month: "Jan", orders: 12 }, { month: "Feb", orders: 25 }, { month: "Mar", orders: 18 },
  { month: "Apr", orders: 35 }, { month: "May", orders: 28 }, { month: "Jun", orders: 48 },
];
const fakeCategoryData = [
  { name: "Electronics", value: 35 }, { name: "Mobile Phones", value: 25 },
  { name: "Furniture", value: 15 }, { name: "Fashion", value: 12 },
  { name: "Vehicles", value: 8 }, { name: "Others", value: 5 },
];

const PlatformAnalytics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["platformAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/analytics");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  const userGrowth = data?.userGrowth?.length ? data.userGrowth : fakeUserGrowth;
  const monthlyOrders = data?.monthlyOrders?.length ? data.monthlyOrders : fakeMonthlyOrders;
  const categoryData = data?.categoryData?.length ? data.categoryData : fakeCategoryData;

  return (
    <div>
      <PageHeader title="Platform Analytics" subtitle="Business insights and growth metrics" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-custom p-5">
          <h3 className="font-display font-semibold text-base-content mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2.5} dot={{ fill: "#0ea5e9", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-custom p-5">
          <h3 className="font-display font-semibold text-base-content mb-4">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-custom p-5">
          <h3 className="font-display font-semibold text-base-content mb-4">Category Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Categories Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-custom p-5">
          <h3 className="font-display font-semibold text-base-content mb-4">Top Categories</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
