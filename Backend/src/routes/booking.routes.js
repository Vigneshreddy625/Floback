import { Router } from 'express';
import { bookingValidation } from '../utils/bookingValidation.js';
import {catchAsync} from "../utils/catchAsync.js"
import {verifyJWT, verifyAdmin} from "../middlewares/auth.middleware.js"
import {
  createBooking,
  getAvailableTimeSlots,
  getCurrentMonthAvailableDates,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking
} from"../controllers/booking.controller.js"

const router = Router();

router.route('/')
  .post(bookingValidation, verifyJWT, catchAsync(createBooking));

router.route('/available-time-slots')
  .get(verifyJWT, catchAsync(getAvailableTimeSlots));

router.route('/available-dates')
  .get(verifyJWT, catchAsync(getCurrentMonthAvailableDates));

router.route('/all')
  .get(verifyJWT, verifyAdmin, getAllBookings);

router.route('/:id')
  .get(verifyJWT, verifyAdmin, catchAsync(getBookingById))
  .delete(verifyJWT, verifyAdmin, catchAsync(deleteBooking));

router.route('/:id/status')
  .patch(verifyJWT, verifyAdmin, catchAsync(updateBookingStatus));

export default router;