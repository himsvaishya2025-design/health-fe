import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiChevronUp,
  FiChevronDown,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
  FiInbox,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/**
 * DataTable — reusable table component
 *
 * Props:
 *  columns  — array of { key, label, sortable?, render? }
 *  data     — array of row objects
 *  onEdit   — (row) => void   called when Edit is clicked
 *  onDelete — (row) => void   called when Delete is clicked
 *  actions  — boolean (default true) show Edit/Delete column
 *  pageSize — rows per page (default 10)
 *  searchable — boolean (default true)
 *  searchKeys — string[] keys to search across (defaults to all column keys)
 */
export default function DataTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  actions = true,
  pageSize = 10,
  searchable = true,
  searchKeys,
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc"); // "asc" | "desc"
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null); // row awaiting confirm

  console.log("Data",data)

  const navigate=useNavigate();

  // ── Search ──────────────────────────────────────────────────────────────────
  const keys = searchKeys ?? columns.map((c) => c.key);
  const filtered = query.trim()
    ? data.filter((row) =>
        keys.some((k) =>
          String(row[k] ?? "")
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      )
    : data;


    console.log("filtered",filtered)

  // ── Sort ────────────────────────────────────────────────────────────────────
  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const va = a[sortKey] ?? "";
        const vb = b[sortKey] ?? "";
        const cmp =
          typeof va === "number" && typeof vb === "number"
            ? va - vb
            : String(va).localeCompare(String(vb));
        return sortDir === "asc" ? cmp : -cmp;
      })
    : filtered;

  // ── Paginate ─────────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const slice = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const handleSearch = (e) => { setQuery(e.target.value); setPage(1); };

  // ── Delete confirm ───────────────────────────────────────────────────────────
  const requestDelete = (row) => setDeleteTarget(row);
  const confirmDelete = () => { onDelete?.(deleteTarget); setDeleteTarget(null); };
  const cancelDelete  = () => setDeleteTarget(null);

  // ── Sort icon helper ─────────────────────────────────────────────────────────
  const SortIcon = ({ col }) => {
    if (!col.sortable) return null;
    if (sortKey !== col.key)
      return <FiChevronUp className="opacity-30 ml-1 inline" size={13} />;
    return sortDir === "asc"
      ? <FiChevronUp   className="ml-1 inline text-blue-500" size={13} />
      : <FiChevronDown className="ml-1 inline text-blue-500" size={13} />;
  };

  return (
    <div className="flex flex-col gap-4">

      {/* ── Search bar ───────────────────────────────────────────────────────── */}
      {searchable && (
        <div className="flex items-center gap-2 w-full max-w-sm">
          <div className="relative w-full">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={15}
            />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200
                         bg-white text-sm text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-transparent transition"
            />
          </div>
        </div>
      )}

      {/* ── Table ────────────────────────────────────────────────────────────── */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && toggleSort(col.key)}
                  className={`px-5 py-3 font-semibold text-gray-600 tracking-wide
                              whitespace-nowrap select-none
                              ${col.sortable ? "cursor-pointer hover:text-blue-600" : ""}`}
                >
                  {col.label}
                  <SortIcon col={col} />
                </th>
              ))}
              {actions && (
                <th className="px-5 py-3 font-semibold text-gray-600 tracking-wide text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="py-16 text-center text-gray-400"
                >
                  <FiInbox size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No records found</p>
                </td>
              </tr>
            ) : (
              slice.map((row, i) => (
                <tr
                  key={row.id ?? i}
                  className="border-b border-gray-100 last:border-0
                             hover:bg-blue-50/40 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-3 text-gray-700 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : row[col.key] ?? "—"}
                    </td>
                  ))}

                  {actions && (
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        {/* Edit */}
                        <button
                          onClick={() =>onEdit?.(row)}
                          title="Edit"
                          className="p-2 rounded-lg text-gray-500 hover:text-blue-600
                                     hover:bg-blue-100 transition-colors"
                        >
                          <FiEdit2 size={15} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => requestDelete(row)}
                          title="Delete"
                          className="p-2 rounded-lg text-gray-500 hover:text-red-600
                                     hover:bg-red-100 transition-colors"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-sm text-gray-500 flex-wrap gap-2">
        <span>
          Showing{" "}
          <span className="font-medium text-gray-700">
            {sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
          </span>{" "}
          –{" "}
          <span className="font-medium text-gray-700">
            {Math.min(safePage * pageSize, sorted.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-700">{sorted.length}</span>
        </span>

        <div className="flex items-center gap-1">
          <PaginationBtn onClick={() => setPage(1)} disabled={safePage === 1}>
            <FiChevronsLeft size={15} />
          </PaginationBtn>
          <PaginationBtn onClick={() => setPage((p) => p - 1)} disabled={safePage === 1}>
            <FiChevronLeft size={15} />
          </PaginationBtn>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("…");
              acc.push(p);
              return acc;
            }, [])
            .map((item, i) =>
              item === "…" ? (
                <span key={`ellipsis-${i}`} className="px-2 text-gray-400">…</span>
              ) : (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                    ${safePage === item
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {item}
                </button>
              )
            )}

          <PaginationBtn onClick={() => setPage((p) => p + 1)} disabled={safePage === totalPages}>
            <FiChevronRight size={15} />
          </PaginationBtn>
          <PaginationBtn onClick={() => setPage(totalPages)} disabled={safePage === totalPages}>
            <FiChevronsRight size={15} />
          </PaginationBtn>
        </div>
      </div>

      {/* ── Delete Confirm Modal ──────────────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <FiTrash2 className="text-red-600" size={18} />
              </div>
              <h3 className="text-base font-semibold text-gray-800">Confirm Delete</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700">
                {deleteTarget.name ?? "this record"}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600
                           border border-gray-200 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white
                           bg-red-600 hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Small helper ──────────────────────────────────────────────────────────── */
function PaginationBtn({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 flex items-center justify-center rounded-lg
                 text-gray-600 hover:bg-gray-100 disabled:opacity-30
                 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}
