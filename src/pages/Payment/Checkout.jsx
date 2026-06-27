import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { FiShield } from "react-icons/fi";
import axiosPublic from "../../utils/axiosPublic";
import axiosSecure from "../../utils/axiosSecure";
import CheckoutForm from "./CheckoutForm";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { productId } = useParams();

  // Fetch product
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["checkoutProduct", productId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/products/${productId}`);
      return res.data;
    },
  });

  // Fetch Stripe client secret
  const { data: paymentData, isLoading: paymentLoading } = useQuery({
    queryKey: ["paymentIntent", productId],
    enabled: !!product,
    queryFn: async () => {
      const res = await axiosSecure.post("/api/payments/create-intent", {
        amount: product.price,
      });
      return res.data;
    },
  });

  if (productLoading || paymentLoading) return <LoadingSpinner />;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="container-custom px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-display font-bold text-base-content mb-6"
        >
          Secure Checkout
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-custom p-6"
          >
            <h2 className="font-display font-semibold text-base-content mb-4">Order Summary</h2>

            <div className="flex gap-4 mb-4 pb-4 border-b border-base-200">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-base-200 shrink-0">
                <img src={product.images?.[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-sm text-base-content">{product.title}</p>
                <p className="text-xs text-base-content/50 mt-1">{product.category}</p>
                <p className="text-xs text-base-content/50">{product.condition}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-base-content/60">
                <span>Product Price</span>
                <span>৳{product.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base-content/60">
                <span>Platform Fee</span>
                <span>৳0</span>
              </div>
              <div className="flex justify-between font-display font-bold text-base-content text-base pt-2 border-t border-base-200">
                <span>Total</span>
                <span className="text-primary">৳{product.price?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 p-3 bg-emerald-500/10 rounded-xl">
              <FiShield className="text-emerald-500 shrink-0" />
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Your payment is secured by Stripe. We never store your card details.
              </p>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-custom p-6"
          >
            <h2 className="font-display font-semibold text-base-content mb-4">Payment Details</h2>

            {paymentData?.clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret: paymentData.clientSecret }}>
                <CheckoutForm product={product} clientSecret={paymentData.clientSecret} />
              </Elements>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
