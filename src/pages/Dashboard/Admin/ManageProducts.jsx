import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const ManageProducts = () => {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/products");
      return res.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => axiosSecure.patch(`/api/admin/products/${id}/status`, { status }),
    onSuccess: () => { toast.success("Product updated!"); queryClient.invalidateQueries(["adminProducts"]); },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/api/admin/products/${id}`),
    onSuccess: () => { toast.success("Product deleted!"); queryClient.invalidateQueries(["adminProducts"]); },
  });

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader title="Manage Products" subtitle={`${products.length} total products`} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-custom overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-base-content/50 text-xs uppercase bg-base-200">
                <th>Product</th>
                <th>Seller</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-base-200/40">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-base-200 shrink-0">
                        <img src={p.images?.[0] || "https://placehold.co/40"} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-sm max-w-[150px] truncate">{p.title}</span>
                    </div>
                  </td>
                  <td className="text-sm text-base-content/60">{p.sellerInfo?.name}</td>
                  <td className="text-sm">{p.category}</td>
                  <td className="font-semibold text-primary text-sm">৳{p.price?.toLocaleString()}</td>
                  <td>
                    <span className={`badge badge-sm ${p.status === "available" ? "badge-success" : p.status === "rejected" ? "badge-error" : "badge-warning"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap">
                      {p.status !== "available" && (
                        <button onClick={() => updateStatus.mutate({ id: p._id, status: "available" })} className="btn btn-success btn-xs rounded-lg gap-1">
                          <FiCheck size={11} /> Approve
                        </button>
                      )}
                      {p.status !== "rejected" && (
                        <button onClick={() => updateStatus.mutate({ id: p._id, status: "rejected" })} className="btn btn-warning btn-xs rounded-lg gap-1">
                          <FiX size={11} /> Reject
                        </button>
                      )}
                      <button onClick={() => { if (confirm("Delete?")) deleteProduct.mutate(p._id); }} className="btn btn-error btn-xs rounded-lg">
                        <FiTrash2 size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageProducts;
