import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiSearch, FiUserX, FiUserCheck, FiTrash2 } from "react-icons/fi";
import axiosSecure from "../../../utils/axiosSecure";
import PageHeader from "../../../components/dashboard/PageHeader";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/users");
      return res.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => axiosSecure.patch(`/api/admin/users/${id}/status`, { status }),
    onSuccess: () => { toast.success("User status updated!"); queryClient.invalidateQueries(["allUsers"]); },
  });

  const deleteUser = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/api/admin/users/${id}`),
    onSuccess: () => { toast.success("User deleted!"); queryClient.invalidateQueries(["allUsers"]); },
  });

  const filtered = users.filter(
    (u) => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div>
      <PageHeader title="Manage Users" subtitle={`${users.length} total users`} />

      <div className="relative mb-5 max-w-sm">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
        <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-custom pl-10" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-custom overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-base-content/50 text-xs uppercase bg-base-200">
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="hover:bg-base-200/40">
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={u.photo || `https://ui-avatars.com/api/?name=${u.name}&size=36&background=0ea5e9&color=fff`}
                        className="w-9 h-9 rounded-full object-cover"
                        alt=""
                      />
                      <span className="font-medium text-sm">{u.name}</span>
                    </div>
                  </td>
                  <td className="text-sm text-base-content/60">{u.email}</td>
                  <td>
                    <span className={`badge badge-sm ${u.role === "admin" ? "badge-error" : u.role === "seller" ? "badge-warning" : "badge-success"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-sm ${u.status === "active" ? "badge-success" : "badge-error"}`}>
                      {u.status || "active"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {u.role !== "admin" && (
                        <>
                          <button
                            onClick={() => updateStatus.mutate({ id: u._id, status: u.status === "active" ? "blocked" : "active" })}
                            className={`btn btn-xs rounded-lg gap-1 ${u.status === "blocked" ? "btn-success" : "btn-warning"}`}
                          >
                            {u.status === "blocked" ? <><FiUserCheck size={11} /> Unblock</> : <><FiUserX size={11} /> Block</>}
                          </button>
                          <button
                            onClick={() => { if (confirm("Delete this user?")) deleteUser.mutate(u._id); }}
                            className="btn btn-error btn-xs rounded-lg"
                          >
                            <FiTrash2 size={11} />
                          </button>
                        </>
                      )}
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

export default ManageUsers;
