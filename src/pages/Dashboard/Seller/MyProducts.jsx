import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import EmptyState from "../../../components/dashboard/EmptyState";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const conditionColor = { "Like New": "badge-success", Good: "badge-info", Refurbished: "badge-warning", Used: "badge-ghost" };

const MyProducts = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/seller/products");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/api/products/${id}`),
    onSuccess: () => { toast.success("Product deleted!"); queryClient.invalidateQueries(["myProducts"]); },
    onError: () => toast.error("Delete failed"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => axiosSecure.patch(`/api/products/${id}`, data),
    onSuccess: () => { toast.success("Product updated!"); queryClient.invalidateQueries(["myProducts"]); setEditProduct(null); },
    onError: () => toast.error("Update failed"),
  });

  const filtered = products.filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader
        title="My Products"
        subtitle={`${products.length} total listings`}
        action={<Link to="/dashboard/add-product" className="btn btn-primary btn-sm rounded-xl text-white gap-1"><FiPlus /> Add Product</Link>}
      />

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-custom pl-10" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState emoji="📦" title="No products found" btnLabel="Add Product" btnTo="/dashboard/add-product" />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-custom overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-base-content/50 text-xs uppercase bg-base-200">
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Condition</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product._id} className="hover:bg-base-200/40">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-200 shrink-0">
                          <img src={product.images?.[0] || "https://placehold.co/48"} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium text-sm max-w-[180px] truncate">{product.title}</span>
                      </div>
                    </td>
                    <td className="text-sm text-base-content/60">{product.category}</td>
                    <td className="font-semibold text-primary">৳{product.price?.toLocaleString()}</td>
                    <td><span className={`badge badge-sm ${conditionColor[product.condition] || "badge-ghost"}`}>{product.condition}</span></td>
                    <td>
                      <span className={`badge badge-sm ${product.status === "available" ? "badge-success" : "badge-error"}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button onClick={() => setEditProduct(product)} className="btn btn-ghost btn-xs rounded-lg text-primary">
                          <FiEdit2 size={13} />
                        </button>
                        <button
                          onClick={() => { if (confirm("Delete this product?")) deleteMutation.mutate(product._id); }}
                          className="btn btn-ghost btn-xs rounded-lg text-error"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <dialog open className="modal modal-open">
          <div className="modal-box rounded-2xl max-w-md">
            <h3 className="font-display font-bold text-lg mb-4">Edit Product</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateMutation.mutate({ id: editProduct._id, data: editProduct });
              }}
              className="space-y-4"
            >
              <input className="input-custom" placeholder="Title" value={editProduct.title} onChange={(e) => setEditProduct({ ...editProduct, title: e.target.value })} required />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" className="input-custom" placeholder="Price" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} required />
                <select className="select select-bordered rounded-xl" value={editProduct.status} onChange={(e) => setEditProduct({ ...editProduct, status: e.target.value })}>
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <textarea className="textarea textarea-bordered rounded-xl w-full resize-none" rows={3} value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
              <div className="flex gap-3">
                <button type="submit" disabled={updateMutation.isPending} className="btn btn-primary flex-1 rounded-xl text-white">
                  {updateMutation.isPending ? <span className="loading loading-spinner loading-sm" /> : "Save"}
                </button>
                <button type="button" onClick={() => setEditProduct(null)} className="btn btn-ghost flex-1 rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setEditProduct(null)} />
        </dialog>
      )}
    </div>
  );
};

export default MyProducts;
