import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberForm from "../../components/MemberForm";
import Toast from "../../components/Toast";
import { memberFields } from "../../formJson/form";
import { useFormOptions } from "../../hooks/useFormOptions";
import { createMember } from "../../services/memberApi";

const AddMember = () => {
  const navigate = useNavigate();
  const { optionsMap, optionsLoading } = useFormOptions();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const fields = useMemo(
    () =>
      memberFields.map((f) =>
        f.optionsKey ? { ...f, options: optionsMap[f.optionsKey] ?? [] } : f
      ),
    [optionsMap]
  );

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      await createMember(data);
      setToast({ type: "success", message: "Member added successfully!" });
      setTimeout(() => navigate("/members"), 1500);
    } catch (err) {
      setToast({
        type: "error",
        message: err?.response?.data?.message ?? "Failed to add member. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (optionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading form…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <MemberForm
        title="Add Member"
        fields={fields}
        mode="add"
        onSubmit={handleCreate}
        onCancel={() => navigate("/members")}
        loading={loading}
      />
    </>
  );
};

export default AddMember;
