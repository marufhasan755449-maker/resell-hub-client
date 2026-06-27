import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiList, FiShoppingBag } from "react-icons/fi";

const PaymentSuccess = () => {
  const { state } = useLocation();

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="card-custom p-8 max-w-md w-full text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-5"
        >
          <FiCheckCircle className="text-emerald-500 text-4xl" />
        </motion.div>

        <h1 className="text-2xl font-display font-bold text-base-content mb-2">
          Payment Successful! 🎉
        </h1>
        <p className="text-base-content/50 text-sm mb-6">
          Your order has been placed and the seller has been notified.
        </p>

        {/* Order details */}
        <div className="bg-base-200 rounded-2xl p-4 text-left space-y-2 mb-6">
          {state?.product && (
            <div className="flex justify-between text-sm">
              <span className="text-base-content/50">Product</span>
              <span className="font-medium text-base-content max-w-[200px] truncate text-right">{state.product}</span>
            </div>
          )}
          {state?.amount && (
            <div className="flex justify-between text-sm">
              <span className="text-base-content/50">Amount Paid</span>
              <span className="font-display font-bold text-primary">৳{state.amount?.toLocaleString()}</span>
            </div>
          )}
          {state?.transactionId && (
            <div className="flex justify-between text-sm">
              <span className="text-base-content/50">Transaction ID</span>
              <code className="text-xs bg-base-300 px-2 py-0.5 rounded-lg font-mono text-primary max-w-[160px] truncate">
                {state.transactionId}
              </code>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-base-content/50">Date</span>
            <span className="font-medium">{new Date().toLocaleDateString("en-BD", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Link to="/dashboard/my-orders" className="btn btn-primary rounded-xl text-white gap-2 font-semibold">
            <FiList /> View My Orders
          </Link>
          <Link to="/products" className="btn btn-ghost rounded-xl gap-2">
            <FiShoppingBag /> Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
