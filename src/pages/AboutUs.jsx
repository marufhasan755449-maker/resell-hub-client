import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiShield } from "react-icons/fi";

const AboutUs = () => (
  <div className="min-h-screen bg-base-100">
    <div className="bg-hero-gradient py-20 text-center">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-display font-bold text-white mb-3">
        About ReSellHub
      </motion.h1>
      <p className="text-white/60 max-w-xl mx-auto">Bangladesh's trusted platform for buying and selling pre-owned products</p>
    </div>

    <div className="container-custom px-4 py-16">
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: <FiTarget size={32} />, title: "Our Mission", desc: "To create a sustainable, safe, and accessible marketplace where everyone can buy and sell pre-owned goods with confidence.", color: "text-primary" },
          { icon: <FiHeart size={32} />, title: "Our Values", desc: "Trust, transparency, and community. We believe in building connections between buyers and sellers that go beyond transactions.", color: "text-rose-500" },
          { icon: <FiShield size={32} />, title: "Our Promise", desc: "Secure payments, verified sellers, and a responsive support team to ensure every experience on ReSellHub is a great one.", color: "text-emerald-500" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-custom p-8 text-center"
          >
            <div className={`${item.color} flex justify-center mb-4`}>{item.icon}</div>
            <h3 className="font-display font-bold text-xl text-base-content mb-3">{item.title}</h3>
            <p className="text-base-content/60 leading-relaxed text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="card-custom p-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-base-content mb-4">Our Story</h2>
        <p className="text-base-content/60 leading-relaxed">
          ReSellHub was founded with a simple idea: what if buying and selling used products in Bangladesh could be as easy, safe, and trustworthy as buying new ones? We built this platform to solve the challenges of trust, payment security, and product discovery that plague the second-hand market. Today, we're proud to serve thousands of buyers and sellers across Bangladesh.
        </p>
      </div>
    </div>
  </div>
);

export default AboutUs;
