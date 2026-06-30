import { useEffect } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

const VARIANTS = {
  success: {
    wrapper: "bg-green-50 border-green-200 text-green-800",
    icon: <FiCheckCircle size={18} className="text-green-500 flex-shrink-0" />,
  },
  error: {
    wrapper: "bg-red-50 border-red-200 text-red-800",
    icon: <FiAlertCircle size={18} className="text-red-500 flex-shrink-0" />,
  },
};

export default function Toast({ type = "success", message, onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const v = VARIANTS[type] ?? VARIANTS.success;

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3
                  rounded-xl border shadow-lg max-w-sm w-full
                  ${v.wrapper}`}
    >
      {v.icon}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="p-1 rounded hover:opacity-60 transition-opacity flex-shrink-0"
      >
        <FiX size={15} />
      </button>
    </div>
  );
}
