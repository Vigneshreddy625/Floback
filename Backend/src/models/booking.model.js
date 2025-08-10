import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [
      /^\+91\s\d{5}\s\d{5}$/,
      'Please enter a valid phone number format: +91 XXXXX XXXXX',
    ],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
    lowercase: true,
  },
  homeAddress: {
    type: String,
    required: [true, 'Home address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters'],
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required'],
    validate: {
      validator: function (date) {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear &&
          date >= today
        );
      },
      message:
        'Preferred date must be within the current month and not in the past',
    },
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
    enum: [
      '10:00 AM - 12:00 PM',
      '12:00 PM - 2:00 PM',
      '2:00 PM - 4:00 PM',
      '4:00 PM - 6:00 PM',
      '6:00 PM - 8:00 PM',
    ],
  },
  serviceInterest: {
    type: String,
    required: [true, 'Service interest is required'],
    enum: [
      'Curtains & Window Treatments',
      'Sofa & Furniture Upholstery',
      'Bedroom & Bath Essentials',
      'Wallpaper & Wall Coverings',
      'Complete Home Makeover',
      'Design Consultation Only',
    ],
  },
  additionalDetails: {
    type: String,
    trim: true,
    maxlength: [1000, 'Additional details cannot exceed 1000 characters'],
  },
  status: {
    type: String,
    enum: ['confirmed', 'completed', 'cancelled'],
    default: 'confirmed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

bookingSchema.index({ preferredDate: 1, preferredTime: 1 });

bookingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

bookingSchema.statics.isTimeSlotAvailable = async function (date, timeSlot) {
  const startOfSelectedDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const startOfNextDay = new Date(startOfSelectedDay);
  startOfNextDay.setDate(startOfSelectedDay.getDate() + 1);

  const booking = await this.findOne({
    preferredDate: {
      $gte: startOfSelectedDay,
      $lt: startOfNextDay,
    },
    preferredTime: timeSlot,
    status: { $in: ['pending', 'confirmed'] },
  });
  return !booking;
};

bookingSchema.statics.getAvailableTimeSlots = async function (date) {
  const allTimeSlots = [
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM',
  ];

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookedSlots = await this.find({
    preferredDate: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
    status: { $in: ['pending', 'confirmed'] },
  }).select('preferredTime');

  const bookedTimeSlots = bookedSlots.map((booking) => booking.preferredTime);

  return allTimeSlots.filter((slot) => !bookedTimeSlots.includes(slot));
};

export const Booking = mongoose.model('Booking', bookingSchema);
