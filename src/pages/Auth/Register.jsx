import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiShoppingBag, FiImage } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthProvider";
import axiosPublic from "../../utils/axiosPublic";
import toast from "react-hot-toast";

const Register = () => {
  const { registerWithEmail, updateUserProfile, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Upload photo to Cloudinary
  const uploadPhoto = async () => {
    if (!photoFile) return null;
    const data = new FormData();
    data.append("file", photoFile);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) return toast.error("Password must be at least 6 characters!");
    if (!/[A-Z]/.test(form.password)) return toast.error("Password must have an uppercase letter!");

    setLoading(true);
    try {
      // Upload photo
      const photoURL = await uploadPhoto();

      // Firebase register
      const result = await registerWithEmail(form.email, form.password);
      await updateUserProfile(form.name, photoURL || "");

      // Save to DB
      await axiosPublic.post("/api/users", {
        name: form.name,
        email: form.email,
        photo: photoURL || "",
        role: form.role,
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message.includes("email-already-in-use") ? "Email already registered!" : "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      // Save to DB (upsert)
      await axiosPublic.post("/api/users", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "buyer",
      });
      toast.success("Registered with Google!");
      navigate("/");
    } catch {
      toast.error("Google sign-up failed!");
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
            Join<br />
            <span className="text-sky-400">ReSellHub</span>
          </h1>
          <p className="text-white/60 max-w-xs leading-relaxed">
            Create your account and start buying or selling pre-owned products today.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-base-100 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <FiShoppingBag className="text-white" />
            </div>
            <span className="font-display font-bold text-xl">Re<span className="text-primary">Sell</span>Hub</span>
          </div>

          <h2 className="text-3xl font-display font-bold text-base-content mb-1">Create Account</h2>
          <p className="text-base-content/50 mb-6">Join thousands of buyers and sellers.</p>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="btn btn-outline w-full rounded-xl gap-3 mb-5 border-base-300 hover:bg-base-200 hover:border-base-300"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          <div className="divider text-base-content/30 text-sm">or register with email</div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Photo upload */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-base-200 overflow-hidden flex items-center justify-center">
                {photoPreview ? (
                  <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="text-base-content/30 text-2xl" />
                )}
              </div>
              <label className="btn btn-outline btn-sm rounded-xl gap-2 cursor-pointer flex-1">
                <FiImage size={14} /> Upload Photo
                <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              </label>
            </div>

            {/* Name */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-medium text-sm">Full Name</span></label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required className="input-custom pl-10" />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-medium text-sm">Email</span></label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className="input-custom pl-10" />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-medium text-sm">Password</span></label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input type={showPass ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Min 6 chars, 1 uppercase" required className="input-custom pl-10 pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-medium text-sm">I want to</span></label>
              <div className="grid grid-cols-2 gap-3">
                {["buyer", "seller"].map((r) => (
                  <label key={r} className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.role === r ? "border-primary bg-primary/5 text-primary" : "border-base-300 text-base-content/60"}`}>
                    <input type="radio" name="role" value={r} checked={form.role === r} onChange={handleChange} className="hidden" />
                    <span className="font-medium text-sm capitalize">{r === "buyer" ? "🛒 Buy Products" : "🏪 Sell Products"}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-xl text-white font-semibold mt-2">
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
