import { useEffect, useState, useMemo } from "react";

const MemberForm = ({
  title,
  fields,
  initialValues = {},
  mode = "add",
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({});
  console.log("fields", fields)

  console.log("initialValue", initialValues)





  //   useEffect(() => {
  //   if (!fields.length) return;

  //   const values = {};

  //   fields.forEach((field) => {
  //     values[field.name] =
  //       initialValues[field.name] ?? field.defaultValue ?? "";
  //   });

  //   setFormData(values);
  // }, [fields, initialValues]);

  useEffect(() => {
    if (!fields.length) return;

    const values = {};

    fields.forEach((field) => {
      let value = initialValues[field.name];
      console.log("value in useEffect", value)

      if (field.getValue) {
        value = field.getValue(value);
      }
      console.log("value", value)

      values[field.name] = value ?? field.defaultValue ?? "";

      console.log("strong", values[field.name]);
    });

    setFormData(values);
    console.log("values", values);
  }, [fields, initialValues]);


  console.log("formData", formData)

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
    <div className="bg-white rounded-xl shadow p-6">

      {title && (
        <h2 className="text-2xl font-semibold mb-6">
          {title}
        </h2>
      )}

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {fields.map((field) => (
            <div key={field.name}>

              <label className="block mb-2 text-sm font-medium text-gray-700">
                {field.label}

                {field.required && (
                  <span className="text-red-500">*</span>
                )}
              </label>

              {/* TEXT */}

              {(field.type === "text" ||
                field.type === "number") && (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                )}

              {/* DATE */}

              {field.type === "date" && (
                <input
                  type="date"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              )}

              {/* SELECT */}

              {field.type === "select" && (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {
                    console.log(
                      field.name,
                      formData[field.name],
                      field.options
                    )
                  }
                  <option value="">Select</option>

                  {field.options?.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {/* TEXTAREA */}

              {field.type === "textarea" && (
                <textarea
                  rows={4}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              )}

              {/* FILE */}

              {field.type === "file" && (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  className="w-full"
                />
              )}

            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            type="reset"
            className="px-6 py-2 rounded-lg border"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white"
          >
            {loading
              ? "Saving..."
              : mode === "add"
                ? "Create"
                : "Update"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default MemberForm;