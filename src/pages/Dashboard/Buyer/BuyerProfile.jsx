import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMapPin, FiImage, FiSave } from "react-icons/fi";
import { useAuth } from "../../../context/AuthProvider";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import toast from "react-hot-toast";

const BuyerProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [form, setForm] = useState({
    name: user?.displayName || "",
    phone: "",
    address: "",
  });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const uploadPhoto = async () => {
    if (!photoFile) return user?.photoURL || "";
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

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const photoURL = await uploadPhoto();
      await updateUserProfile(form.name, photoURL);
      await axiosSecure.patch("/api/users/me", {
        name: form.name,
        photo: photoURL,
        phone: form.phone,
        location: form.address,
      });
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Profile Settings" subtitle="Manage your personal information" />

      <div className="max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-custom p-6">
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-8 pb-8 border-b border-base-200">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  src={photoPreview || user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=0ea5e9&color=fff&size=80`}
                  alt={user?.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="font-display font-bold text-lg text-base-content">{user?.displayName}</p>
              <p className="text-base-content/50 text-sm mb-3">{user?.email}</p>
              <label className="btn btn-outline btn-sm rounded-xl gap-2 cursor-pointer">
                <FiImage size={14} /> Change Photo
                <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              </label>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-5">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium text-sm flex items-center gap-2"><FiUser size={13} /> Full Name</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-custom"
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium text-sm flex items-center gap-2"><FiMail size={13} /> Email</span>
              </label>
              <input type="email" value={user?.email} disabled className="input-custom opacity-50 cursor-not-allowed" />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium text-sm flex items-center gap-2"><FiPhone size={13} /> Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="+880 17XX-XXXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-custom"
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium text-sm flex items-center gap-2"><FiMapPin size={13} /> Address</span>
              </label>
              <input
                type="text"
                placeholder="Your city, district"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-custom"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-xl text-white gap-2 font-semibold mt-2">
              {loading ? <span className="loading loading-spinner loading-sm" /> : <><FiSave size={15} /> Save Changes</>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyerProfile;
