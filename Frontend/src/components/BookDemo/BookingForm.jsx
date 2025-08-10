import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../authContext/useAuth";
import FormInput from "./Form/FormInput";
import { AlertCircle, Calendar, Loader2 } from "lucide-react";
import FormTextArea from "./Form/FormTextArea";
import FormSelect from "./Form/FormSelect";
import axios from "axios";
import StatusMessage from "./Form/StatusMessage";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const BookingForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    homeAddress: "",
    preferredDate: "",
    preferredTime: "",
    serviceInterest: "",
    additionalDetails: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const serviceOptions = [
    { value: "", label: "What are you looking for?" },
    {
      value: "Curtains & Window Treatments",
      label: "Curtains & Window Treatments",
    },
    {
      value: "Sofa & Furniture Upholstery",
      label: "Sofa & Furniture Upholstery",
    },
    { value: "Bedroom & Bath Essentials", label: "Bedroom & Bath Essentials" },
    {
      value: "Wallpaper & Wall Coverings",
      label: "Wallpaper & Wall Coverings",
    },
    { value: "Complete Home Makeover", label: "Complete Home Makeover" },
    { value: "Design Consultation Only", label: "Design Consultation Only" },
  ];

  const defaultTimeSlots = useMemo(
    () =>
      [
        "10:00 AM - 12:00 PM",
        "12:00 PM - 2:00 PM",
        "2:00 PM - 4:00 PM",
        "4:00 PM - 6:00 PM",
        "6:00 PM - 8:00 PM",
      ].map((slot) => ({ value: slot, label: slot })),
    []
  );

  const getMinDate = () => new Date().toISOString().split("T")[0];
  const getMaxDate = () => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDay.toISOString().split("T")[0];
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/bookings/available-dates");
        setAvailableDates(data.data?.availableDates || []);
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!formData.preferredDate) {
        setAvailableSlots(defaultTimeSlots);
        return;
      }
      try {
        const { data } = await api.get(
          `/bookings/available-time-slots?date=${formData.preferredDate}`
        );
        setAvailableSlots(
          (data.data?.availableSlots || []).map((slot) => ({
            value: slot,
            label: slot,
          }))
        );
      } catch (error) {
        console.error("Error fetching time slots:", error);
        setAvailableSlots(defaultTimeSlots);
      }
    })();
  }, [formData.preferredDate, defaultTimeSlots]);

  const validateForm = () => {
    const newErrors = {};
    if (!user.fullName?.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\+91\s\d{5}\s\d{5}$/.test(formData.phoneNumber))
      newErrors.phoneNumber =
        "Please enter a valid phone number format: +91 XXXXX XXXXX";
    if (!user.email?.trim()) newErrors.email = "Email is required";
    if (!formData.homeAddress.trim())
      newErrors.homeAddress = "Home address is required";
    else if (formData.homeAddress.length > 500)
      newErrors.homeAddress = "Address cannot exceed 500 characters";
    if (!formData.preferredDate)
      newErrors.preferredDate = "Preferred date is required";
    if (!formData.preferredTime)
      newErrors.preferredTime = "Preferred time is required";
    if (!formData.serviceInterest)
      newErrors.serviceInterest = "Service interest is required";
    if (formData.additionalDetails.length > 1000)
      newErrors.additionalDetails =
        "Additional details cannot exceed 1000 characters";
    return newErrors;
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }

  setLoading(true);
  setErrors({});
  setSubmitStatus({ type: "", message: "" });

  try {
    const payload = {
      ...formData,
      fullName: user.fullName,
      email: user.email,
    };
    const { data } = await api.post("/bookings", payload);

    const successMessage = data?.message || 
      "Booking created successfully! You will receive a mail within 24 hours.";
    
    setSubmitStatus({
      type: "success",
      message: successMessage,
    });
    
    toast.success(successMessage);

    setFormData({
      phoneNumber: "",
      homeAddress: "",
      preferredDate: "",
      preferredTime: "",
      serviceInterest: "",
      additionalDetails: "",
    });

    const updatedDates = await api.get("/bookings/available-dates");
    setAvailableDates(updatedDates.data?.data?.availableDates || []);
    
  } catch (error) {
    if (error.response?.status === 400) {
      const errorMessage = error.response?.data?.message || 
        "Please check your input and try again.";
      
      setErrors({
        general: errorMessage,
      });
      
      toast.error(errorMessage);
      
    } else {
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Failed to create booking. Please try again.";
        
      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });
      
      toast.error(errorMessage);
    }
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    const digits = value.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91"))
      value = `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
    else if (digits.length === 10)
      value = `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    else if (value.startsWith("+91")) {
      const numericPart = value.replace(/\+91\s?/, "").replace(/\D/g, "");
      value =
        numericPart.length > 5
          ? `+91 ${numericPart.slice(0, 5)} ${numericPart.slice(5)}`
          : `+91 ${numericPart}`;
    }
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
    if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: "" }));
  };

  useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(
        () => setSubmitStatus({ type: "", message: "" }),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [submitStatus.message]);

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Schedule Your Visit
        </h2>
        <p className="text-slate-600">
          Fill out the form below and we'll contact you within 24 hours
        </p>
      </div>

      <StatusMessage type={submitStatus.type} message={submitStatus.message} />

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Full Name *"
            name="fullName"
            value={user.fullName || ""}
            disabled
          />
          <FormInput
            label="Phone Number *"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            error={errors.phoneNumber}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        <FormInput
          label="Email Address *"
          type="email"
          name="email"
          value={user.email || ""}
          disabled
        />

        <FormTextArea
          label="Home Address *"
          name="homeAddress"
          value={formData.homeAddress}
          onChange={handleChange}
          error={errors.homeAddress}
          placeholder="Complete address with pincode"
          maxLength="500"
        >
          <div className="text-xs text-slate-500 mt-1">
            {formData.homeAddress.length}/500 characters
          </div>
        </FormTextArea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Preferred Date *"
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            error={errors.preferredDate}
            min={getMinDate()}
            max={getMaxDate()}
          />
          <FormSelect
            label={
              <>
                Preferred Time *
                {formData.preferredDate && (
                  <span className="text-xs text-slate-500 ml-2">
                    ({availableSlots.length} slots available)
                  </span>
                )}
              </>
            }
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            error={errors.preferredTime}
            options={[
              { value: "", label: "Select Time Slot" },
              ...availableSlots,
            ]}
            disabled={!formData.preferredDate}
          />
        </div>

        {formData.preferredDate && availableSlots.length === 0 && (
          <p className="text-amber-600 text-xs mt-1">
            No slots available for this date. Please select another date.
          </p>
        )}

        <FormSelect
          label="Service Interest *"
          name="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange}
          error={errors.serviceInterest}
          options={serviceOptions}
        />

        <FormTextArea
          label="Additional Details"
          name="additionalDetails"
          value={formData.additionalDetails}
          onChange={handleChange}
          error={errors.additionalDetails}
          placeholder="Tell us about your style preferences, budget range, or any specific requirements..."
          maxLength="1000"
        >
          <div className="text-xs text-slate-500 mt-1">
            {formData.additionalDetails.length}/1000 characters
          </div>
        </FormTextArea>

        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {errors.general}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={
            loading || (formData.preferredDate && availableSlots.length === 0)
          }
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Booking...</span>
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              <span>Book Your Free Demo</span>
            </>
          )}
        </button>

        <div className="text-xs text-slate-500 text-center mt-4">
          By clicking "Book Your Free Demo", you agree to our terms of service
          and privacy policy.
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
