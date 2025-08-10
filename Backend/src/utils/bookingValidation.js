import { body } from "express-validator";

export const bookingValidation = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),

  body('phoneNumber')
  .matches(/^\+91\s?\d{5}\s?\d{5}$/)
  .withMessage('Phone number must be in format: +91 XXXXX XXXXX or +91XXXXXXXXXX'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('homeAddress')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Home address must be between 10 and 500 characters'),

  body('preferredDate')
    .isISO8601()
    .withMessage('Please provide a valid date in ISO format')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      if (
        date.getMonth() !== currentMonth ||
        date.getFullYear() !== currentYear
      ) {
        throw new Error('Preferred date must be within the current month');
      }

      if (date < today.setHours(0, 0, 0, 0)) {
        throw new Error('Preferred date cannot be in the past');
      }

      return true;
    }),

  body('preferredTime')
    .isIn([
      '10:00 AM - 12:00 PM',
      '12:00 PM - 2:00 PM',
      '2:00 PM - 4:00 PM',
      '4:00 PM - 6:00 PM',
      '6:00 PM - 8:00 PM',
    ])
    .withMessage('Please select a valid time slot'),

  body('serviceInterest')
    .isIn([
      'Curtains & Window Treatments',
      'Sofa & Furniture Upholstery',
      'Bedroom & Bath Essentials',
      'Wallpaper & Wall Coverings',
      'Complete Home Makeover',
      'Design Consultation Only',
    ])
    .withMessage('Please select a valid service'),

  body('additionalDetails')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Additional details cannot exceed 1000 characters'),
];
