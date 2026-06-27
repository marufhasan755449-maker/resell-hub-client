import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiShoppingBag } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(form.email, form.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message.includes("wrong-password") ? "Wrong password!" : "User not found!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative */}
      <div className="hidden lg:flex w-1/2 bg-hero-gradient flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            Welcome to<br />
            <span className="text-sky-400">ReSellHub</span>
          </h1>
          <p className="text-white/60 max-w-xs leading-relaxed">
            Bangladesh's trusted second-hand marketplace. Buy and sell safely.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-base-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <FiShoppingBag className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-base-content">
              Re<span className="text-primary">Sell</span>Hub
            </span>
          </div>

          <h2 className="text-3xl font-display font-bold text-base-content mb-1">Sign In</h2>
          <p className="text-base-content/50 mb-8">Welcome back! Please enter your details.</p>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="btn btn-outline w-full rounded-xl gap-3 mb-6 border-base-300 hover:bg-base-200 hover:border-base-300"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <div className="divider text-base-content/30 text-sm">or continue with email</div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Email */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium text-sm">Email</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="input-custom pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium text-sm">Password</span>
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="input-custom pl-10 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-xl text-white font-semibold mt-2"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
