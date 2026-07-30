import CustomerDetails from "../../components/booking/CustomerDetails";
import BookingAddress from "../../components/booking/BookingAddress";
import BookingDateTime from "../../components/booking/BookingDateTime";
import BookingNotes from "../../components/booking/BookingNotes";

const BookingForm = ({
  formData,
  setFormData,
}) => {

  return (

    <div className="space-y-8">

      <CustomerDetails
        formData={formData}
        setFormData={setFormData}
      />

      <BookingAddress
        formData={formData}
        setFormData={setFormData}
      />

      <BookingDateTime
        formData={formData}
        setFormData={setFormData}
      />

      <BookingNotes
        formData={formData}
        setFormData={setFormData}
      />

    </div>

  );

};

export default BookingForm;