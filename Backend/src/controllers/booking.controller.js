import { Booking } from '../models/booking.model.js';
import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import { sendEmail } from '../utils/sendEmail.js';

const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const {
      fullName,
      phoneNumber,
      email,
      homeAddress,
      preferredDate,
      preferredTime,
      serviceInterest,
      additionalDetails,
    } = req.body;

    const user = req.user._id;

    const dateObj = new Date(preferredDate);

    const normalizedDate = new Date(
      Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())
    );

    const existingBooking = await Booking.findOne({
      user,
      preferredDate: normalizedDate,
      preferredTime,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: `You already have a booking for this date and time.${existingBooking}`,
      });
    }

    const booking = new Booking({
      user,
      fullName,
      phoneNumber,
      email,
      homeAddress,
      preferredDate: normalizedDate,
      preferredTime,
      serviceInterest,
      additionalDetails,
    });

    const savedBooking = await booking.save();

    const bookingConfirmationEmail = (booking) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
      <img src="https://res.cloudinary.com/dqhcyazcg/image/upload/v1754807479/floriva-logo_jflhcc.jpg" alt="Floriva" style="max-width: 150px; height:"100px";>
    </div>
    
    <!-- Body -->
    <div style="padding: 30px;">
      <h2>Booking Confirmation</h2>
      <p>Hello ${booking.fullName},</p>
      <p>Thank you for choosing Floriva! Your booking is confirmed, and we’re excited to assist you.</p>      
      <h3 style="margin-top: 20px;">Booking Details</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Service:</strong> ${booking.serviceInterest}</li>
        <li><strong>Date:</strong> ${booking.preferredDate.toDateString()}</li>
        <li><strong>Time:</strong> ${booking.preferredTime}</li>
        <li><strong>Address:</strong> ${booking.homeAddress}</li>
        ${booking.additionalDetails ? `<li><strong>Additional Details:</strong> ${booking.additionalDetails}</li>` : ''}
      </ul>
      
      <p>If any of this information is incorrect, please contact us immediately by replying to this email.</p>
      <p>We look forward to serving you!</p>
      <p>Best regards,<br>The Floriva Team</p>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
      <p>&copy; ${new Date().getFullYear()} Floriva. All rights reserved.</p>
    </div>
  </div>
`;

    try {
      await sendEmail({
        to: booking.email,
        subject: 'Booking Confirmation',
        html: bookingConfirmationEmail(booking),
      });
    } catch (emailError) {
      console.error('Failed to send Booking confirmation email:', emailError);
    }

    res.status(201).json({
      success: true,
      message:
        'Booking created successfully! We will contact you within 24 hours.',
      data: savedBooking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `You already have a booking for this date and time.${error}`,
      });
    }
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message,
    });
  }
};

const getAvailableTimeSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required',
      });
    }

    const selectedDate = new Date(date);
    const today = new Date();

    if (
      selectedDate.getMonth() !== today.getMonth() ||
      selectedDate.getFullYear() !== today.getFullYear()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Date must be within the current month',
      });
    }

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot select past dates',
      });
    }

    const availableSlots = await Booking.getAvailableTimeSlots(selectedDate);

    res.status(200).json({
      success: true,
      data: {
        date: selectedDate.toISOString().split('T')[0],
        availableSlots,
        totalSlots: 5,
        availableCount: availableSlots.length,
      },
    });
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available time slots',
      error: error.message,
    });
  }
};

const getCurrentMonthAvailableDates = async (req, res) => {
  try {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const availableDates = [];

    for (
      let date = new Date(Math.max(firstDay, today));
      date <= lastDay;
      date.setDate(date.getDate() + 1)
    ) {
      const availableSlots = await Booking.getAvailableTimeSlots(
        new Date(date)
      );

      if (availableSlots.length > 0) {
        availableDates.push({
          date: new Date(date).toISOString().split('T')[0],
          availableSlots: availableSlots.length,
          totalSlots: 5,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        month: currentMonth + 1,
        year: currentYear,
        availableDates,
      },
    });
  } catch (error) {
    console.error('Error fetching available dates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available dates',
      error: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      throw new ApiError(401, 'Unauthorized: User not found in request.');
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    const query = {};
    if (
      status &&
      ['pending', 'confirmed', 'completed', 'cancelled'].includes(status)
    ) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        bookings,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalBookings: total,
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid status. Must be one of: pending, confirmed, completed, cancelled',
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking,
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking status',
      error: error.message,
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: error.message,
    });
  }
};

export {
  createBooking,
  getAvailableTimeSlots,
  getCurrentMonthAvailableDates,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};
