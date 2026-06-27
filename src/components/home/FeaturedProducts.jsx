import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import SectionTitle from "../ui/SectionTitle";
import ProductCard, { ProductCardSkeleton } from "../ui/ProductCard";
import useProducts from "../../hooks/useProducts";

const FeaturedProducts = () => {
  const { products, isLoading } = useProducts({ limit: 6 });

  return (
    <section className="section-padding bg-base-100">
      <div className="container-custom">
        <SectionTitle
          title="Featured Products"
          subtitle="Handpicked deals you don't want to miss"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="btn btn-outline btn-primary rounded-xl gap-2 px-8"
          >
            View All Products <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
