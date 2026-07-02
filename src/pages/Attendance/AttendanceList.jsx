import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import DataTable from "../../components/DataTable";
import Toast from "../../components/Toast";
import { deleteMember, getMembers } from "../../services/memberApi";
import { getAttendance } from "../../services/memberApi";
import { attendanceFeilds } from "../../formJson/form";

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



export default function AttendanceList() {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [toast, setToast] = useState(null);

  const loadAttendance = async () => {
    try {
      const res = await getAttendance();
      console.log("res",res)
      setAttendance(res.data?.data ?? []);
    } catch {
      setToast({ type: "error", message: "Failed to load members." });
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleEdit = (row) => {
    navigate(`/attendance/edit/${row._id}`);
  };

  const handleDelete = async (row) => {
    try {
      await deleteAttendace(row._id);
      setAttendance((prev) => prev.filter((m) => m._id !== row._id));
      setToast({ type: "success", message: `${row.fullName}'s attendance deleted successfully.` });
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
          <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage member attendace</p>
        </div>
        {/* <button
          onClick={() => navigate("/members/add")}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                     text-white text-sm font-medium px-4 py-2.5 rounded-xl
                     shadow-sm transition-colors"
        >
          <FiUserPlus size={16} />
          Add Member
        </button> */}
      </div>

      {/* Table */}
      <DataTable
        columns={attendanceFeilds}
        data={attendance}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pageSize={8}
        searchable
      />
    </>
  );
}
