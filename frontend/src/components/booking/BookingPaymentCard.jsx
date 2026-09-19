import { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";
import { toast } from "sonner";

import {
  createPayment,
  verifyPayment,
  markPaymentFailed,
} from "../../api/payment.api";

const BookingPaymentCard = ({
  booking,
  onPaymentSuccess,
}) => {
  const [paying, setPaying] = useState(false);

  const isPaid = booking.paymentStatus === "completed";

  const canPay =
    ["accepted", "in-progress"].includes(booking.status) &&
    booking.paymentStatus === "pending";

  const handlePayment = async () => {
    try {
      setPaying(true);

      // 1. Create Razorpay order on our backend
      const response = await createPayment(booking._id);

      const {
        payment,
        razorpayOrder,
        keyId,
      } = response.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Service Marketplace",
        description: `Payment for ${booking.service?.title || "service"}`,
        order_id: razorpayOrder.id,

        handler: async function (razorpayResponse) {
          try {
            // 3. Verify payment on our backend
            const verifyResponse = await verifyPayment(
              payment._id,
              {
                razorpay_payment_id:
                  razorpayResponse.razorpay_payment_id,

                razorpay_order_id:
                  razorpayResponse.razorpay_order_id,

                razorpay_signature:
                  razorpayResponse.razorpay_signature,
              }
            );

            toast.success("Payment completed successfully");

            // 4. Update booking state in parent
            onPaymentSuccess?.(
              verifyResponse.data
            );
          } catch (error) {
            console.error(
              "Payment verification failed:",
              error
            );

            toast.error(
              error.message ||
                "Payment verification failed"
            );
          } finally {
            setPaying(false);
          }
        },

        modal: {
          ondismiss: function () {
            setPaying(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
  "payment.failed",
  async function (response) {
    try {
      console.error(
        "Razorpay payment failed:",
        response.error
      );

      await markPaymentFailed(
        payment._id,
        {
          razorpay_order_id:
            razorpayOrder.id,

          reason:
            response.error?.description ||
            "Payment failed",
        }
      );

      toast.error(
        response.error?.description ||
          "Payment failed"
      );
    } catch (error) {
      console.error(
        "Failed to update payment status:",
        error
      );

      toast.error(
        "Payment failed"
      );
    } finally {
      setPaying(false);
    }
  }
);
      razorpay.open();
    } catch (error) {
      console.error(
        "Failed to initiate payment:",
        error
      );

      toast.error(
        error.message ||
          "Unable to initiate payment"
      );

      setPaying(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Payment
          </p>

          <h2 className="mt-1 text-lg font-semibold text-gray-900">
            ₹{booking.totalAmount}
          </h2>
        </div>

        {isPaid ? (
          <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
            <CheckCircle2 size={16} />
            Paid
          </div>
        ) : (
          <div className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
            Pending
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-gray-100 pt-5">
        {isPaid ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2
              size={17}
              className="text-green-600"
            />
            Payment completed successfully.
          </div>
        ) : canPay ? (
          <>
            <p className="text-sm leading-6 text-gray-500">
              Your booking has been accepted. Complete
              the payment to proceed with the service.
            </p>

            <button
              type="button"
              onClick={handlePayment}
              disabled={paying}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CreditCard size={17} />

              {paying
                ? "Processing..."
                : `Pay ₹${booking.totalAmount}`}
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <LockKeyhole size={13} />
              Secure payment
            </div>
          </>
        ) : (
          <p className="text-sm leading-6 text-gray-500">
            Payment will be available after the provider
            accepts your booking.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingPaymentCard