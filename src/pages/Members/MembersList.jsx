/**
 * MembersPage.jsx  — Example usage of <DataTable>
 *
 * HOW EDIT / DELETE WIRE UP
 * ─────────────────────────
 * 1. onEdit(row)   → receives the full row object → open your modal/drawer pre-filled
 * 2. onDelete(row) → DataTable shows a confirm modal first → on confirm, calls this
 *                    → call your API, then remove the row from state
 */

import { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import DataTable from "../../components/DataTable";

import { getMembers } from "../../services/memberApi";
import { useNavigate } from "react-router-dom";

// ── Status badge renderer (custom cell) ──────────────────────────────────────
const StatusBadge = (value) => {
  const map = {
    Active:   "bg-green-100  text-green-700",
    Inactive: "bg-gray-100   text-gray-500",
    Expired:  "bg-red-100    text-red-600",
    Pending:  "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[value] ?? "bg-gray-100 text-gray-500"}`}>
      {value}
    </span>
  );
};

// ── Column definitions ────────────────────────────────────────────────────────
const COLUMNS = [
  { key: "fullName",    label: "Name",    sortable: true  },
  { key: "phone",   label: "Phone"                    },
    {key:"joiningDate",label:"JoiningDate"},
  {key:"membershipEndDate",label:"MembershipEndDate"},
    {
    key: "packageId",
    label: "Package",
    render: (_, row) => row.packageId?.packageName || "—",
  },
  {
    key: "trainerId",
    label: "Trainer",
    render: (_, row) => row.trainerId?.fullName || "—",
  },

  {
    key: "status",
    label: "Status",
    sortable: true,
    render: StatusBadge,          // ← custom cell renderer
  },
];

// ── Seed data ─────────────────────────────────────────────────────────────────
const SEED = [
  { id: 1, name: "Rahul Sharma",  phone: "9999999999", package: "3 Months",  joiningdate:"9 october 2026", membershipenddate:"9 jan 2028", trainer: "Manish", status: "Active"   },
  { id: 2, name: "Priya Verma",   phone: "9888888888", package: "6 Months", joiningDate:"9 october 2026", membershipEndDate:"9 jan 2028", trainer: "Anjali", status: "Active"   },
  { id: 3, name: "Amit Singh",    phone: "9777777777", package: "1 Month",  joiningDate:"9 october 2026", membershipEndDate:"9 jan 2028", trainer: "Manish", status: "Expired"  },
  { id: 4, name: "Sneha Patil",   phone: "9666666666", package: "12 Months",joiningDate:"9 october 2026", membershipEndDate:"9 jan 2028", trainer: "Ravi",   status: "Inactive" },
  { id: 5, name: "Karan Mehta",   phone: "9555555555", package: "3 Months", joiningDate:"9 october 2026", membershipEndDate:"9 jan 2028", trainer: "Anjali", status: "Pending"  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MembersList() {
  const [members, setMembers]       = useState([]);
  const [editTarget, setEditTarget] = useState(null); // member being edited


  const navigate=useNavigate();

  console.log("EditTarget",editTarget)

  // ── EDIT: open modal/drawer pre-filled with row data ─────────────────────
  const handleEdit = (row) => {
     navigate(`/members/edit/${row._id}`)
    // setEditTarget(row);
    // → swap this for your <MemberModal member={row} /> or router push
    console.log("Edit triggered for:", row);
  };

  // ── DELETE: called AFTER the built-in confirm modal ──────────────────────
  const handleDelete = async (row) => {
    // 1. Call your API
    // await api.delete(`/members/${row.id}`);

    // 2. Remove from local state (optimistic UI)
    setMembers((prev) => prev.filter((m) => m.id !== row.id));
    console.log("Deleted:", row);
  };

  const loadMembers=async()=>{
    const response=await getMembers();
    setMembers(response.data.data)
  }

  useEffect(()=>{
    loadMembers();
  },[])



  return (
    <div className="min-h-screen bg-gray-100 flex">

   

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Members</h1>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                             text-white text-sm font-medium px-4 py-2.5 rounded-xl
                             shadow-sm transition-colors" onClick={()=>navigate('/members/add')}>
            <FiUserPlus size={16} />
            Add Member
          </button>
        </div>

        {/* ── DataTable ────────────────────────────────────────────────────── */}
        <DataTable
          columns={COLUMNS}
          data={members}
          onEdit={handleEdit}       // receives full row → open edit modal
          onDelete={handleDelete}   // called after built-in confirm modal
          pageSize={8}
          searchable
        />

        {/* ── Example edit modal placeholder ─────────────────────────────── */}
        {editTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Edit Member — {editTarget.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                (Replace this with your real edit form. The full row object is in{" "}
                <code className="bg-gray-100 px-1 rounded">editTarget</code>.)
              </p>
              <pre className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 mb-4 overflow-auto">
                {JSON.stringify(editTarget, null, 2)}
              </pre>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditTarget(null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm
                             text-gray-600 hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => setEditTarget(null)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700
                             text-white text-sm transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
