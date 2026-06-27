import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUpload, FiX, FiPlus } from "react-icons/fi";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import toast from "react-hot-toast";

const categories = ["Electronics", "Furniture", "Vehicles", "Fashion", "Mobile Phones", "Books", "Sports", "Home Appliances"];
const conditions = ["Like New", "Good", "Refurbished", "Used"];

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [form, setForm] = useState({
    title: "", category: "", condition: "", price: "", stock: 1, description: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    if (imageFiles.length + files.length > 4) return toast.error("Max 4 images!");
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (i) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== i));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const uploadImages = async () => {
    const urls = await Promise.all(
      imageFiles.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: data }
        );
        const json = await res.json();
        return json.secure_url;
      })
    );
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) return toast.error("Please upload at least 1 image!");
    setLoading(true);
    try {
      const images = await uploadImages();
      await axiosSecure.post("/api/products", { ...form, price: Number(form.price), stock: Number(form.stock), images });
      toast.success("Product listed successfully!");
      navigate("/dashboard/my-products");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Add New Product" subtitle="List a product for sale" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-custom p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Image Upload */}
          <div>
            <label className="label py-1"><span className="label-text font-medium text-sm">Product Images (max 4)</span></label>
            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative w-24 h-24">
                  <img src={src} alt="" className="w-full h-full object-cover rounded-xl" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-error text-white rounded-full flex items-center justify-center">
                    <FiX size={10} />
                  </button>
                </div>
              ))}
              {imagePreviews.length < 4 && (
                <label className="w-24 h-24 border-2 border-dashed border-base-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors text-base-content/40 hover:text-primary">
                  <FiUpload size={20} />
                  <span className="text-xs mt-1">Upload</span>
                  <input type="file" accept="image/*" multiple onChange={handleImages} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="form-control">
            <label className="label py-1"><span className="label-text font-medium text-sm">Product Title</span></label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Dell Inspiron 15 Laptop" required className="input-custom" />
          </div>

          {/* Category + Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-medium text-sm">Category</span></label>
              <select name="category" value={form.category} onChange={handleChange} required className="select select-bordered rounded-xl">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-medium text-sm">Condition</span></label>
              <select name="condition" value={form.condition} onChange={handleChange} required className="select select-bordered rounded-xl">
                <option value="">Select condition</option>
                {conditions.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-medium text-sm">Price (৳)</span></label>
              <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="0" min="0" required className="input-custom" />
            </div>
            <div className="form-control">
              <label className="label py-1"><span className="label-text font-medium text-sm">Stock Quantity</span></label>
              <input type="number" name="stock" value={form.stock} onChange={handleChange} min="1" required className="input-custom" />
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label py-1"><span className="label-text font-medium text-sm">Description</span></label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your product in detail..." required rows={4} className="textarea textarea-bordered rounded-xl focus:border-primary resize-none" />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-xl text-white gap-2 font-semibold">
            {loading ? <><span className="loading loading-spinner loading-sm" /> Uploading...</> : <><FiPlus /> List Product</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;
