import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiCreditCard } from "react-icons/fi";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import EmptyState from "../../../components/dashboard/EmptyState";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const PaymentHistory = () => {
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/payments/my-payments");
      return res.data;
    },
  });

  const totalSpent = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader
        title="Payment History"
        subtitle={`Total spent: ৳${totalSpent.toLocaleString()}`}
      />

      {payments.length === 0 ? (
        <EmptyState emoji="💳" title="No payments yet" desc="Your payment history will appear here" />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-custom overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base-content/50 text-xs uppercase bg-base-200">
                  <th>Transaction ID</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-base-200/40">
                    <td>
                      <code className="text-xs bg-base-200 px-2 py-1 rounded-lg text-primary font-mono">
                        {payment.transactionId?.slice(0, 16)}...
                      </code>
                    </td>
                    <td className="text-sm text-base-content font-medium max-w-[160px] truncate">
                      {payment.productTitle}
                    </td>
                    <td className="font-semibold text-primary font-display">
                      ৳{payment.amount?.toLocaleString()}
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-sm text-base-content/60">
                        <FiCreditCard size={13} /> {payment.paymentMethod || "Stripe"}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-sm ${
                        payment.paymentStatus === "success" || payment.paymentStatus === "paid"
                          ? "badge-success"
                          : payment.paymentStatus === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}>
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td className="text-base-content/40 text-xs whitespace-nowrap">
                      {new Date(payment.createdAt).toLocaleDateString("en-BD", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
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

export default PaymentHistory;
