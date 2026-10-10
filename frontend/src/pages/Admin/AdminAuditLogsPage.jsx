import { useEffect, useState, useCallback } from "react";
import {
  History,
  Search,
  RotateCcw,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Eye,
  FileCode,
  Globe,
  User,
} from "lucide-react";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminModal from "../../components/admin/AdminModal";
import { getAdminAuditLogs } from "../../api/admin.api";
import toast from "react-hot-toast";

const ACTION_OPTIONS = [
  { label: "All Actions", value: "" },
  { label: "Approve Provider", value: "APPROVE_PROVIDER" },
  { label: "Reject Provider", value: "REJECT_PROVIDER" },
  { label: "Suspend Provider", value: "SUSPEND_PROVIDER" },
  { label: "Reactivate Provider", value: "REACTIVATE_PROVIDER" },
  { label: "Update User Role", value: "UPDATE_USER_ROLE" },
  { label: "Delete User", value: "DELETE_USER" },
  { label: "Activate Service", value: "ACTIVATE_SERVICE" },
  { label: "Deactivate Service", value: "DEACTIVATE_SERVICE" },
  { label: "Delete Service", value: "DELETE_SERVICE" },
  { label: "Cancel Booking", value: "CANCEL_BOOKING" },
  { label: "Create Category", value: "CREATE_CATEGORY" },
  { label: "Update Category", value: "UPDATE_CATEGORY" },
  { label: "Delete Category", value: "DELETE_CATEGORY" },
];

const TARGET_TYPES = [
  { label: "All Targets", value: "" },
  { label: "Provider", value: "Provider" },
  { label: "User", value: "User" },
  { label: "Service", value: "Service" },
  { label: "Booking", value: "Booking" },
  { label: "Category", value: "Category" },
];

const AdminAuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalLogs, setTotalLogs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedTargetType, setSelectedTargetType] = useState("");

  // Details Modal
  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    log: null,
  });

  const fetchLogs = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAdminAuditLogs({
        page,
        limit: 15,
        action: selectedAction,
        targetType: selectedTargetType,
      });

      const data = res?.data || {};
      setLogs(data.logs || []);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
      setTotalLogs(data.totalLogs || 0);
    } catch (err) {
      console.error("Failed to load audit logs:", err);
      toast.error(err?.message || "Failed to load audit records");
    } finally {
      setLoading(false);
    }
  }, [selectedAction, selectedTargetType]);

  useEffect(() => {
    fetchLogs(1);
  }, [fetchLogs]);

  const resetFilters = () => {
    setSelectedAction("");
    setSelectedTargetType("");
  };

  const getActionBadgeClass = (action = "") => {
    if (
      action.includes("APPROVE") ||
      action.includes("CREATE") ||
      action.includes("REACTIVATE") ||
      action.includes("ACTIVATE_")
    ) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    }
    if (
      action.includes("DELETE") ||
      action.includes("REJECT") ||
      action.includes("CANCEL")
    ) {
      return "bg-rose-50 text-rose-700 border-rose-200/60";
    }
    if (action.includes("SUSPEND") || action.includes("UPDATE")) {
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    }
    return "bg-blue-50 text-blue-700 border-blue-200/60";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Compliance & Security
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Admin Audit Trail
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Immutable log of all administrative interventions, approvals, cancellations, and deletions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchLogs(currentPage)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
          Refresh
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-3">
        {/* Action Type */}
        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          {ACTION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Target Type */}
        <select
          value={selectedTargetType}
          onChange={(e) => setSelectedTargetType(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          {TARGET_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Reset */}
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          <RotateCcw size={13} />
          Reset Filters
        </button>
      </div>

      {/* Logs Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Administrator</th>
                <th className="px-4 py-3.5">Action Executed</th>
                <th className="px-4 py-3.5">Target Record</th>
                <th className="px-4 py-3.5">Audit Note / Reason</th>
                <th className="px-4 py-3.5">IP Address</th>
                <th className="px-5 py-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                      <p className="mt-3 text-xs font-semibold">Loading audit logs...</p>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <History size={28} className="mx-auto mb-2 text-slate-400" />
                    No audit records match your criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4 text-slate-600">
                      <p className="font-semibold text-slate-900">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-[10px] uppercase">
                          {log.admin?.username?.[0] || "A"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {log.admin?.username || "Admin"}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {log.admin?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-block border px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${getActionBadgeClass(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="font-semibold text-slate-800">
                        {log.targetType || "Entity"}
                      </span>
                      {log.targetId && (
                        <p className="font-mono text-[10px] text-slate-400">
                          #{String(log.targetId).slice(-6)}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-4 text-slate-600 max-w-xs truncate">
                      {log.reason || "—"}
                    </td>

                    <td className="px-4 py-4 font-mono text-[11px] text-slate-400">
                      {log.ipAddress || "Localhost"}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setDetailsModal({ isOpen: true, log })
                        }
                        title="View Full Metadata"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 ml-auto"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalLogs}
          pageSize={15}
          onPageChange={(page) => fetchLogs(page)}
        />
      </div>

      {/* MODAL: Full Audit Log Metadata */}
      <AdminModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, log: null })}
        title="Audit Log Entry Details"
        subtitle={detailsModal.log?.action}
        maxWidth="max-w-2xl"
      >
        {detailsModal.log && (
          <div className="space-y-4 text-xs">
            {/* Top Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/50">
                <span className="text-slate-400 uppercase text-[10px] font-bold">
                  Admin User
                </span>
                <p className="font-bold text-slate-900 mt-1">
                  {detailsModal.log.admin?.username} ({detailsModal.log.admin?.email})
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/50">
                <span className="text-slate-400 uppercase text-[10px] font-bold">
                  Target Entity
                </span>
                <p className="font-bold text-slate-900 mt-1">
                  {detailsModal.log.targetType} (#{detailsModal.log.targetId})
                </p>
              </div>
            </div>

            {/* Reason */}
            {detailsModal.log.reason && (
              <div className="rounded-xl border border-slate-200 p-3">
                <span className="text-slate-400 uppercase text-[10px] font-bold">
                  Administrative Reason / Note
                </span>
                <p className="font-medium text-slate-800 mt-1">
                  {detailsModal.log.reason}
                </p>
              </div>
            )}

            {/* Metadata Payload JSON */}
            <div>
              <span className="text-slate-500 uppercase text-[10px] font-bold mb-1 block">
                Logged Action Details (JSON)
              </span>
              <pre className="rounded-xl border border-slate-200 bg-slate-900 p-3 text-[11px] text-slate-100 overflow-x-auto font-mono">
                {JSON.stringify(detailsModal.log.details || {}, null, 2)}
              </pre>
            </div>

            {/* Client IP & Time */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              <span>Client IP: {detailsModal.log.ipAddress || "Unknown"}</span>
              <span>
                Timestamp: {new Date(detailsModal.log.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default AdminAuditLogsPage;

