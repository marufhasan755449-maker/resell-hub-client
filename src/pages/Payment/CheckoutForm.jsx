import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../../utils/axiosSecure";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import { FiLock } from "react-icons/fi";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#f87272" },
  },
};

const CheckoutForm = ({ product, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Save payment + order to DB
      try {
        const orderRes = await axiosSecure.post("/api/orders", {
          productId: product._id,
          productTitle: product.title,
          productImage: product.images?.[0],
          amount: product.price,
          sellerInfo: product.sellerInfo,
          paymentStatus: "paid",
          orderStatus: "Pending",
          transactionId: paymentIntent.id,
          paymentMethod: "stripe",
        });

        await axiosSecure.post("/api/payments", {
          orderId: orderRes.data._id,
          transactionId: paymentIntent.id,
          amount: product.price,
          productTitle: product.title,
          paymentStatus: "success",
          paymentMethod: "stripe",
        });

        toast.success("Payment successful! 🎉");
        navigate("/payment-success", {
          state: {
            transactionId: paymentIntent.id,
            amount: product.price,
            product: product.title,
            orderId: orderRes.data._id,
          },
        });
      } catch {
        toast.error("Payment done but order save failed. Contact support.");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label py-1">
          <span className="label-text font-medium text-sm flex items-center gap-2">
            <FiLock size={13} /> Card Details
          </span>
        </label>
        <div className="border border-base-300 rounded-xl p-4 focus-within:border-primary transition-colors">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-xs text-base-content/40 mt-2">Use test card: 4242 4242 4242 4242</p>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary w-full rounded-xl text-white font-semibold gap-2"
      >
        {processing ? (
          <><span className="loading loading-spinner loading-sm" /> Processing...</>
        ) : (
          <><FiLock /> Pay ৳{product?.price?.toLocaleString()}</>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
