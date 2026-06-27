import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-hero-gradient py-16 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-display font-bold text-white mb-2">
          Contact Us
        </motion.h1>
        <p className="text-white/60">We'd love to hear from you</p>
      </div>

      <div className="container-custom px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-display font-bold text-base-content mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-8">
              {[
                { icon: <FiMapPin />, label: "Address", value: "Dhaka, Bangladesh" },
                { icon: <FiPhone />, label: "Phone", value: "+880 1700-000000" },
                { icon: <FiMail />, label: "Email", value: "support@resellhub.com" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 card-custom p-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">{item.icon}</div>
                  <div>
                    <p className="text-xs text-base-content/50">{item.label}</p>
                    <p className="font-medium text-base-content text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="card-custom p-8">
            <h2 className="text-xl font-display font-bold text-base-content mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="input-custom" />
                </div>
                <div className="form-control">
                  <input type="email" placeholder="Your Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="input-custom" />
                </div>
              </div>
              <input type="text" placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required className="input-custom" />
              <textarea placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={5} className="textarea textarea-bordered w-full rounded-xl focus:border-primary resize-none" />
              <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-xl text-white gap-2">
                {loading ? <span className="loading loading-spinner loading-sm" /> : <><FiSend /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
