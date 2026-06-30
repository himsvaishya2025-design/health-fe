import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MemberForm from "../../components/MemberForm";
import Toast from "../../components/Toast";
import { memberFields } from "../../formJson/form";
import { useFormOptions } from "../../hooks/useFormOptions";
import { getMemberById, updateMember } from "../../services/memberApi";

const EditMember = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();

  const { optionsMap, optionsLoading } = useFormOptions();
  const [member, setMember] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const fields = useMemo(
    () =>
      memberFields.map((f) =>
        f.optionsKey ? { ...f, options: optionsMap[f.optionsKey] ?? [] } : f
      ),
    [optionsMap]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMemberById(memberId);
        setMember(res.data?.data ?? res.data);
      } catch {
        setToast({ type: "error", message: "Failed to load member details." });
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [memberId]);

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      await updateMember(memberId, data);
      setToast({ type: "success", message: "Member updated successfully!" });
      setTimeout(() => navigate("/members"), 1500);
    } catch (err) {
      setToast({
        type: "error",
        message: err?.response?.data?.message ?? "Failed to update member. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching || optionsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading member…</p>
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
        title="Edit Member"
        fields={fields}
        initialValues={member ?? {}}
        mode="edit"
        onSubmit={handleUpdate}
        onCancel={() => navigate("/members")}
        loading={loading}
      />
    </>
  );
};

export default EditMember;
