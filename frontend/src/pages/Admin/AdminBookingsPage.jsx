import { useEffect, useState, useCallback } from "react";
import {
  CalendarDays,
  Search,
  RotateCcw,
  RefreshCw,
  Eye,
  XCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  User,
  Briefcase,
  CheckCircle2,
  Calendar,
  Star,
} from "lucide-react";
import AdminPagination from "../../components/admin/AdminPagination";
import AdminModal from "../../components/admin/AdminModal";
import {
  getAllBookingsAdmin,
  getBookingDetailsAdmin,
  cancelBookingAdmin,
} from "../../api/admin.api";
import toast from "react-hot-toast";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modals
  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    loading: false,
    data: null,
  });

  const [cancelModal, setCancelModal] = useState({
    isOpen: false,
    booking: null,
    reason: "",
    submitting: false,
  });

  const fetchBookings = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllBookingsAdmin({
        page,
        limit: 10,
        status: statusFilter,
        paymentStatus: paymentStatusFilter,
        startDate,
        endDate,
      });

      const data = res?.data || {};
      setBookings(data.bookings || []);
      setCurrentPage(data.currentPage || page);
      setTotalPages(data.totalPages || 1);
      setTotalBookings(data.totalBookings || 0);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      toast.error(err?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, paymentStatusFilter, startDate, endDate]);

  useEffect(() => {
    fetchBookings(1);
  }, [fetchBookings]);

  const handleOpenDetails = async (bookingId) => {
    try {
      setDetailsModal({ isOpen: true, loading: true, data: null });
      const res = await getBookingDetailsAdmin(bookingId);
      setDetailsModal({ isOpen: true, loading: false, data: res?.data });
    } catch (err) {
      toast.error(err?.message || "Failed to load booking details");
      setDetailsModal({ isOpen: false, loading: false, data: null });
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelModal.booking) return;
    if (!cancelModal.reason.trim()) {
      toast.error("Please enter a reason for cancellation");
      return;
    }

    try {
      setCancelModal((prev) => ({ ...prev, submitting: true }));
      await cancelBookingAdmin(cancelModal.booking._id, {
        cancellationReason: cancelModal.reason.trim(),
      });
      toast.success("Booking cancelled successfully by administrator.");
      setCancelModal({
        isOpen: false,
        booking: null,
        reason: "",
        submitting: false,
      });
      fetchBookings(currentPage);
    } catch (err) {
      toast.error(err?.message || "Cancellation failed");
      setCancelModal((prev) => ({ ...prev, submitting: false }));
    }
  };

  const resetFilters = () => {
    setStatusFilter("");
    setPaymentStatusFilter("");
    setStartDate("");
    setEndDate("");
  };

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt || 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Operations & Orders
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Booking Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Audit platform customer orders, monitor fulfillment status, and perform administrator cancellations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchBookings(currentPage)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
          Refresh
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs sm:grid-cols-2 lg:grid-cols-5">
        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Booking Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in-progress">In-Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Payment Status */}
        <select
          value={paymentStatusFilter}
          onChange={(e) => setPaymentStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option value="">All Payment Statuses</option>
          <option value="pending">Payment Pending</option>
          <option value="completed">Payment Completed</option>
          <option value="failed">Payment Failed</option>
        </select>

        {/* Start Date */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          title="From Booking Date"
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        />

        {/* End Date */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          title="To Booking Date"
          className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none"
        />

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

      {/* Bookings Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Booking Details</th>
                <th className="px-4 py-3.5">Customer</th>
                <th className="px-4 py-3.5">Provider</th>
                <th className="px-4 py-3.5">Amount</th>
                <th className="px-4 py-3.5">Payment</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
                      <p className="mt-3 text-xs font-semibold">Loading bookings...</p>
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <CalendarDays size={28} className="mx-auto mb-2 text-slate-400" />
                    No bookings found matching your selected filters.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-bold text-slate-900 truncate">
                          {b.service?.title || "Custom Service"}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          ID: #{b._id.slice(-6)}
                        </p>
                        {b.bookingDate && (
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock size={11} />
                            {new Date(b.bookingDate).toLocaleDateString()}{" "}
                            {b.timeSlot || ""}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      <p className="font-semibold truncate">
                        {b.customer?.username || b.customer?.email || "Customer"}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {b.customer?.email}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      <p className="font-semibold truncate">
                        {b.provider?.businessName || "Provider"}
                      </p>
                    </td>

                    <td className="px-4 py-4 font-bold text-slate-900">
                      ₹{b.totalAmount || b.service?.price || 0}
                    </td>

                    <td className="px-4 py-4">
                      {b.paymentStatus === "completed" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 capitalize">
                          {b.paymentStatus || "Pending"}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${
                          b.status === "completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : b.status === "cancelled"
                            ? "bg-rose-50 text-rose-700"
                            : b.status === "confirmed"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Details */}
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(b._id)}
                          title="View Details"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Cancel Button if not completed/cancelled */}
                        {b.status !== "completed" && b.status !== "cancelled" && (
                          <button
                            type="button"
                            onClick={() =>
                              setCancelModal({
                                isOpen: true,
                                booking: b,
                                reason: "",
                                submitting: false,
                              })
                            }
                            title="Admin Cancellation"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                          >
                            <XCircle size={15} />
                          </button>
                        )}
                      </div>
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
          totalItems={totalBookings}
          pageSize={10}
          onPageChange={(page) => fetchBookings(page)}
        />
      </div>

      {/* MODAL: Booking Details */}
      <AdminModal
        isOpen={detailsModal.isOpen}
        onClose={() =>
          setDetailsModal({ isOpen: false, loading: false, data: null })
        }
        title="Booking Details & Audit"
        subtitle={detailsModal.data?._id ? `ID #${detailsModal.data._id}` : ""}
        maxWidth="max-w-2xl"
      >
        {detailsModal.loading ? (
          <div className="py-12 text-center text-slate-500">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 mx-auto" />
            <p className="mt-3 text-xs">Loading booking record...</p>
          </div>
        ) : detailsModal.data ? (
          <div className="space-y-4">
            {/* Top Status & Price Banner */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Service Booked
                </p>
                <h4 className="text-base font-bold text-slate-900">
                  {detailsModal.data.service?.title || "Custom Service"}
                </h4>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">
                  ₹{detailsModal.data.totalAmount || detailsModal.data.service?.price || 0}
                </p>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${
                    detailsModal.data.status === "completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : detailsModal.data.status === "cancelled"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {detailsModal.data.status}
                </span>
              </div>
            </div>

            {/* Customer & Provider Grids */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 p-3 space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  Customer
                </span>
                <p className="font-semibold text-slate-900">
                  {detailsModal.data.customer?.username || "N/A"}
                </p>
                <p className="text-slate-500">
                  Email: {detailsModal.data.customer?.email}
                </p>
                <p className="text-slate-500">
                  Phone: {detailsModal.data.customer?.phone || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  Provider
                </span>
                <p className="font-semibold text-slate-900">
                  {detailsModal.data.provider?.businessName || "N/A"}
                </p>
                <p className="text-slate-500">
                  Provider ID: {detailsModal.data.provider?._id}
                </p>
              </div>
            </div>

            {/* Schedule & Time */}
            <div className="rounded-xl border border-slate-200 p-3 text-xs space-y-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Schedule & Location
              </span>
              <p>
                <span className="text-slate-400">Date: </span>
                <strong className="text-slate-800">
                  {new Date(detailsModal.data.bookingDate).toLocaleDateString()}
                </strong>{" "}
                at{" "}
                <strong className="text-slate-800">
                  {detailsModal.data.timeSlot || "Not specified"}
                </strong>
              </p>
              {detailsModal.data.address && (
                <p>
                  <span className="text-slate-400">Service Address: </span>
                  <span className="text-slate-700">
                    {typeof detailsModal.data.address === "object"
                      ? `${detailsModal.data.address.street || ""}, ${detailsModal.data.address.city || ""}`
                      : detailsModal.data.address}
                  </span>
                </p>
              )}
            </div>

            {/* Cancellation info if cancelled */}
            {detailsModal.data.status === "cancelled" && (
              <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3 text-xs space-y-1">
                <p className="font-bold text-rose-800">Cancellation Info</p>
                <p className="text-rose-700">
                  Cancelled By:{" "}
                  <strong className="capitalize">
                    {detailsModal.data.cancelledBy || "admin"}
                  </strong>
                </p>
                <p className="text-rose-700">
                  Reason: {detailsModal.data.cancellationReason || "No reason recorded"}
                </p>
              </div>
            )}

            {/* Payment Details */}
            {detailsModal.data.paymentId && (
              <div className="rounded-xl border border-slate-200 p-3 text-xs space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                  Payment Transaction
                </span>
                <div className="grid sm:grid-cols-2 gap-2 pt-1">
                  <p>
                    <span className="text-slate-400">Status: </span>
                    <strong className="capitalize text-slate-800">
                      {detailsModal.data.paymentId.paymentStatus || detailsModal.data.paymentStatus}
                    </strong>
                  </p>
                  <p>
                    <span className="text-slate-400">Method: </span>
                    <strong className="text-slate-800">
                      {detailsModal.data.paymentId.paymentMethod || "Online"}
                    </strong>
                  </p>
                  {detailsModal.data.paymentId.transactionId && (
                    <p className="sm:col-span-2 font-mono text-[11px] text-slate-500">
                      Txn ID: {detailsModal.data.paymentId.transactionId}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </AdminModal>

      {/* MODAL: Cancel Booking */}
      <AdminModal
        isOpen={cancelModal.isOpen}
        onClose={() =>
          setCancelModal({
            isOpen: false,
            booking: null,
            reason: "",
            submitting: false,
          })
        }
        title="Administrative Booking Cancellation"
        subtitle={
          cancelModal.booking ? `Order #${cancelModal.booking._id.slice(-6)}` : ""
        }
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3">
            <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Cancelling this booking will release the locked booking slot in the schedule and automatically transmit high-priority notifications to both the customer and the service provider.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cancellation Reason (Required) *
            </label>
            <textarea
              value={cancelModal.reason}
              onChange={(e) =>
                setCancelModal((prev) => ({ ...prev, reason: e.target.value }))
              }
              rows={3}
              placeholder="e.g. Requested by customer or scheduling conflict"
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() =>
                setCancelModal({
                  isOpen: false,
                  booking: null,
                  reason: "",
                  submitting: false,
                })
              }
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirmCancel}
              disabled={cancelModal.submitting}
              className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-rose-700 disabled:opacity-50"
            >
              {cancelModal.submitting ? "Cancelling..." : "Confirm Cancellation"}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminBookingsPage;

