import BookingDateTime from "../../components/booking/BookingDateTime";
import BookingNotes from "../../components/booking/BookingNotes";

const BookingForm = ({
  formData,
  setFormData,
  service,
}) => {
  return (
    <div className="space-y-6">

      <BookingDateTime
        formData={formData}
        setFormData={setFormData}
        service={service}
      />

      <BookingNotes
        formData={formData}
        setFormData={setFormData}
      />

    </div>
  );
};

export default BookingForm;