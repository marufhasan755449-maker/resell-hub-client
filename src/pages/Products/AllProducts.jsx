import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard, { ProductCardSkeleton } from "../../components/ui/ProductCard";
import SectionTitle from "../../components/ui/SectionTitle";
import useProducts from "../../hooks/useProducts";

const categories = ["All", "Electronics", "Furniture", "Vehicles", "Fashion", "Mobile Phones", "Books", "Sports", "Home Appliances"];
const sortOptions = [
  { label: "Newest First", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [viewGrid, setViewGrid] = useState(true);

  const { products, totalPages, totalCount, isLoading } = useProducts({
    search,
    category: category === "All" ? "" : category,
    sort,
    page,
    limit: 9,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-hero-gradient py-16">
        <div className="container-custom px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold text-white mb-3"
          >
            All Products
          </motion.h1>
          <p className="text-white/60">{totalCount} products available</p>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="max-w-xl mx-auto mt-6 flex gap-2"
          >
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="input w-full rounded-xl pl-11 bg-base-100 border-0 focus:outline-none"
              />
            </div>
            <button type="submit" className="btn btn-primary rounded-xl px-6 text-white">
              Search
            </button>
          </motion.form>
        </div>
      </div>

      <div className="container-custom px-4 py-10">
        {/* Filters row */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`btn btn-sm rounded-xl transition-all ${
                  category === cat
                    ? "btn-primary text-white"
                    : "btn-ghost text-base-content/60 hover:text-base-content"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + view toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="select select-bordered select-sm rounded-xl"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <div className="flex bg-base-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewGrid(true)}
                className={`btn btn-xs rounded-lg ${viewGrid ? "btn-primary text-white" : "btn-ghost"}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewGrid(false)}
                className={`btn btn-xs rounded-lg ${!viewGrid ? "btn-primary text-white" : "btn-ghost"}`}
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className={`grid gap-6 ${viewGrid ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {Array(9).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-display font-semibold text-base-content mb-2">No products found</h3>
            <p className="text-base-content/50">Try a different search or category</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewGrid ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-2xl"}`}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn btn-sm btn-ghost rounded-xl gap-1 disabled:opacity-40"
            >
              <FiChevronLeft /> Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`btn btn-sm rounded-xl w-9 ${page === p ? "btn-primary text-white" : "btn-ghost"}`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn btn-sm btn-ghost rounded-xl gap-1 disabled:opacity-40"
            >
              Next <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
