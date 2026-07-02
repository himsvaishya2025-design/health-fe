import { useEffect, useState,useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " +
  "placeholder-gray-400 transition";
const EMPTY_INITIAL_VALUES  = {};
const MemberForm = ({
  title,
  fields = [],
  initialValues = EMPTY_INITIAL_VALUES,
  mode = "add",
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({});

const prev = useRef({});

useEffect(() => {
  console.log("fields changed:", prev.current.fields !== fields);
  console.log(
    "initialValues changed:",
    prev.current.initialValues !== initialValues
  );

  prev.current = { fields, initialValues };

  if (!fields.length) return;

  const values = {};

  fields.forEach((field) => {
    let value = initialValues[field.name];
    if (field.getValue) value = field.getValue(value);
    values[field.name] = value ?? field.defaultValue ?? "";
  });

  setFormData(values);
}, [fields, initialValues]);

//   useEffect(() => {
//   console.log("MemberForm effect");

//   if (!fields.length) return;

//   const values = {};

//   fields.forEach((field) => {
//     let value = initialValues[field.name];
//     if (field.getValue) value = field.getValue(value);
//     values[field.name] = value ?? field.defaultValue ?? "";
//   });

//   setFormData(values);
// }, [fields, initialValues]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-white
                       border border-transparent hover:border-gray-200 transition"
          >
            <FiArrowLeft size={18} />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {mode === "add" ? "Fill in the details to register a new member." : "Update member information below."}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.colSpan === 2 ? "md:col-span-2" : ""}
              >
                <label className="block mb-1.5 text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-0.5">*</span>}
                </label>

                {(field.type === "text" || field.type === "number") && (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className={inputClass}
                  />
                )}

                {field.type === "date" && (
                  <input
                    type="date"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className={inputClass}
                  />
                )}

                {field.type === "select" && (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className={inputClass}
                  >
                    <option value="">— Select —</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "textarea" && (
                  <textarea
                    rows={3}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={inputClass + " resize-none"}
                  />
                )}

                {field.type === "file" && (
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleChange}
                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4
                               file:rounded-lg file:border-0 file:text-sm file:font-medium
                               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium
                           text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                         text-white text-sm font-medium shadow-sm transition"
            >
              {loading ? "Saving…" : mode === "add" ? "Create Member" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberForm;
