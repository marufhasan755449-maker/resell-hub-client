import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";

const stories = [
  {
    name: "Md. Rakib Hasan",
    role: "Buyer",
    avatar: "https://i.pravatar.cc/80?img=3",
    story: "Found a Dell laptop in excellent condition at half the market price. The seller was trustworthy and delivery was quick!",
    rating: 5,
    product: "Dell Laptop",
  },
  {
    name: "Nusrat Jahan",
    role: "Seller",
    avatar: "https://i.pravatar.cc/80?img=5",
    story: "Sold my old furniture within 2 days of listing. ReSellHub made it so easy to connect with genuine buyers.",
    rating: 5,
    product: "Wooden Furniture Set",
  },
  {
    name: "Arif Hossain",
    role: "Buyer",
    avatar: "https://i.pravatar.cc/80?img=7",
    story: "Got a great deal on a smartphone. The platform is very user-friendly and the payment was 100% secure.",
    rating: 5,
    product: "Samsung Galaxy S21",
  },
];

const SuccessStories = () => (
  <section className="section-padding bg-base-100">
    <div className="container-custom">
      <SectionTitle
        title="Success Stories"
        subtitle="Real experiences from our community"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="card-custom p-6 flex flex-col gap-4"
          >
            {/* Stars */}
            <div className="flex gap-1">
              {Array(s.rating).fill(0).map((_, j) => (
                <FiStar key={j} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Story text */}
            <p className="text-base-content/70 text-sm leading-relaxed flex-1">
              "{s.story}"
            </p>

            {/* Badge */}
            <div className="inline-flex">
              <span className="badge badge-sm badge-outline text-primary border-primary">
                {s.product}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-3 border-t border-base-200">
              <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-sm text-base-content">{s.name}</p>
                <span className={`badge badge-xs ${s.role === "Seller" ? "badge-warning" : "badge-success"}`}>
                  {s.role}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
