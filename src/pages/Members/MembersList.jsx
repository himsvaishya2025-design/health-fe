import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import DataTable from "../../components/DataTable";
import Toast from "../../components/Toast";
import { deleteMember, getMembers } from "../../services/memberApi";

const StatusBadge = (value) => {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-500",
    Expired: "bg-red-100 text-red-600",
    Pending: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        styles[value] ?? "bg-gray-100 text-gray-500"
      }`}
    >
      {value ?? "—"}
    </span>
  );
};

const COLUMNS = [
  { key: "fullName", label: "Name", sortable: true },
  { key: "phone", label: "Phone" },
  { key: "joiningDate", label: "Joining Date" },
  { key: "membershipEndDate", label: "End Date" },
  {
    key: "packageId",
    label: "Package",
    render: (_, row) => row.packageId?.packageName ?? "—",
  },
  {
    key: "trainerId",
    label: "Trainer",
    render: (_, row) => row.trainerId?.fullName ?? "—",
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: StatusBadge,
  },
];

export default function MembersList() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [toast, setToast] = useState(null);

  const loadMembers = async () => {
    try {
      const res = await getMembers();
      setMembers(res.data?.data ?? []);
    } catch {
      setToast({ type: "error", message: "Failed to load members." });
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleEdit = (row) => {
    navigate(`/members/edit/${row._id}`);
  };

  const handleDelete = async (row) => {
    try {
      await deleteMember(row._id);
      setMembers((prev) => prev.filter((m) => m._id !== row._id));
      setToast({ type: "success", message: `${row.fullName} deleted successfully.` });
    } catch {
      setToast({ type: "error", message: "Failed to delete member." });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Members</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage gym memberships</p>
        </div>
        <button
          onClick={() => navigate("/members/add")}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                     text-white text-sm font-medium px-4 py-2.5 rounded-xl
                     shadow-sm transition-colors"
        >
          <FiUserPlus size={16} />
          Add Member
        </button>
      </div>

      {/* Table */}
      <DataTable
        columns={COLUMNS}
        data={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pageSize={8}
        searchable
      />
    </>
  );
}
