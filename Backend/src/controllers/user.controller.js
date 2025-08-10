import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';

const API_URL = process.env.FRONTED_URL

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while generating refresh and access token: ' +
        error.message
    );
  }
};

const registerUser = async (req, res) => {
  const { email, password, fullName } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({
    fullName,
    password,
    email,
  });

  const verificationToken = jwt.sign(
    { _id: user._id },
    process.env.EMAIL_VERIFICATION_SECRET,
    { expiresIn: '24h' }
  );

  const verificationUrl = `${API_URL}/verify-email?token=${verificationToken}`;

  const emailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
        <img src="https://res.cloudinary.com/dqhcyazcg/image/upload/v1754807479/floriva-logo_jflhcc.jpg" alt="Company Logo" style="max-width: 150px;">
      </div>
      
      <div style="padding: 30px;">
        <h2>Confirm Your Email Address</h2>
        <p>Hello ${user.fullName},</p>
        <p>Thanks for signing up! To complete your registration and activate your account, just click the button below to verify your email address.</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; font-size: 18px;">
            Verify My Email
          </a>
        </div>
        
        <p>This link is only valid for **24 hours**.</p>
        <p>If you didn't create an account with us, please ignore this email. No further action is required.</p>
        <p>Best regards,<br>The Floriva Team</p>
      </div>
      
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
        <p>&copy; ${new Date().getFullYear()} Floriva. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    await sendEmail({
      to: email,
      subject: 'Verify Email Address',
      html: emailContent,
    });
  } catch (emailError) {
    console.error('Failed to send verification email:', emailError);
  }

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Something went wrong while registering user');
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdUser,
        'User registered successfully. Please check your email to verify your account.'
      )
    );
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new ApiError(400, 'Verification token is required');
  }

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    if (user.isVerified) {
      return res
        .status(200)
        .json(new ApiResponse(200, null, 'Email already verified'));
    }

    user.isVerified = true;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Email verified successfully'));
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(400, 'Verification token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(400, 'Invalid verification token');
    }
    throw new ApiError(500, 'Email verification failed');
  }
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isVerified) {
    throw new ApiError(400, 'Email is already verified');
  }

  const verificationToken = jwt.sign(
    { _id: user._id },
    process.env.EMAIL_VERIFICATION_SECRET,
    { expiresIn: '24h' }
  );

  const verificationUrl = `${API_URL}/verify-email?token=${verificationToken}`;

  const emailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
        <img src="https://res.cloudinary.com/dqhcyazcg/image/upload/v1754807479/floriva-logo_jflhcc.jpg" alt="Company Logo" style="max-width: 150px;">
      </div>
      
      <div style="padding: 30px;">
        <h2>Confirm Your Email Address</h2>
        <p>Hello ${user.fullName},</p>
        <p>Thanks for signing up! To complete your registration and activate your account, just click the button below to verify your email address.</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; font-size: 18px;">
            Verify My Email
          </a>
        </div>
        
        <p>This link is only valid for **24 hours**.</p>
        <p>If you didn't create an account with us, please ignore this email. No further action is required.</p>
        <p>Best regards,<br>The Floriva Team</p>
      </div>
      
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
        <p>&copy; ${new Date().getFullYear()} Floriva. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    await sendEmail({
      to: email,
      subject: 'Verify Email Address',
      html: emailContent,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, null, 'Verification email sent successfully'));
  } catch (emailError) {
    console.error('Failed to send verification email:', emailError);
    throw new ApiError(500, 'Failed to send verification email');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(401, 'Email is required for login');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, 'User does not exist');
  }

  if (!user.isVerified) {
    throw new ApiError(401, 'Please verify your email before logging in');
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        'User logged in successfully'
      )
    );
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          'If this email exists, a reset link has been sent'
        )
      );
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  const resetUrl = `${API_URL}/reset-password?token=${resetToken}`;

  const emailContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    
    <!-- Header with logo -->
    <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
      <img src="https://res.cloudinary.com/dqhcyazcg/image/upload/v1754807479/floriva-logo_jflhcc.jpg" alt="Company Logo" style="max-width: 150px;">
    </div>
    
    <!-- Body content -->
    <div style="padding: 30px;">
      <h2>Password Reset Request</h2>
      <p>Hello ${user.fullName},</p>
      <p>We received a request to reset your password. To proceed, please click the button below:</p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${resetUrl}" style="background-color: #f44336; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; font-size: 18px;">
          Reset Password
        </a>
      </div>
      
      <p>This link will expire in <strong>15 minutes</strong>.</p>
      <p>If you didn’t request this password reset, you can safely ignore this email.</p>
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
      to: user.email,
      subject: 'Password Reset Request',
      html: emailContent,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          'If this email exists, a reset link has been sent'
        )
      );
  } catch (emailError) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.error('Failed to send password reset email:', emailError);
    throw new ApiError(500, 'Failed to send password reset email');
  }
};

const validateResetToken = async (req, res) => {
  const { token } = req.query;

  if (!token)
    return res.status(400).json({ valid: false, message: 'No token provided' });

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ valid: false, message: 'Token invalid or expired' });
  }

  return res.status(200).json({ valid: true, message: 'Token is valid' });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    throw new ApiError(400, 'Token and new password are required');
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters long');
  }

  const resetTokenHash = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired reset token');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.refreshToken = undefined;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Password reset successfully'));
};

const userDetails = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized request');
  }

  const { hintName, mobile, alternateMobile, dob, gender } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (gender !== undefined) user.gender = gender;
  if (hintName !== undefined) user.hintName = hintName;
  if (mobile !== undefined) user.mobile = mobile;
  if (alternateMobile !== undefined) user.alternateMobile = alternateMobile;
  if (dob !== undefined) user.dob = dob;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User details updated successfully',
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      mobile: user.mobile,
      alternateMobile: user.alternateMobile,
      hintName: user.hintName,
      dob: user.dob,
      gender: user.gender,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
};

const getCurrentUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'No user logged in'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, 'Current user fetched successfully'));
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    sameSite: 'None',
    secure: process.env.NODE_ENV === 'production',
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
};

const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    console.log('Incoming Refresh Token:', incomingRefreshToken);
    console.log('Stored Refresh Token:', user?.refreshToken);

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired or used');
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          'Access token refreshed successfully'
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    console.log('Delete user request received', {
      params: req.params,
      user: req.user,
    });

    const { id: userId } = req.params;
    console.log('User ID to delete:', userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return next(new ApiError(400, 'Invalid user ID'));
    }

    if (!req.user) {
      console.error('req.user is undefined or null');
      return next(new ApiError(401, 'Authentication required'));
    }

    console.log('Authenticated user:', {
      id: req.user._id,
      role: req.user.role,
    });

    const user = await User.findById(userId);
    console.log('User found:', user ? true : false);

    if (!user) {
      return next(new ApiError(404, 'No User Found'));
    }

    const requesterId = req.user._id.toString();
    const targetId = userId.toString();

    console.log('Comparing IDs:', {
      requesterId,
      targetId,
      isAdmin: req.user.role === 'admin',
    });

    if (requesterId !== targetId && req.user.role !== 'admin') {
      return next(
        new ApiError(403, 'You are not authorized to delete this user')
      );
    }

    console.log('Permission check passed, proceeding with deletion');

    await user.deleteOne();
    console.log('User deleted successfully');

    res
      .status(200)
      .json(new ApiResponse(200, null, 'User deleted successfully'));
  } catch (error) {
    console.error('Error in deleteUser:', error);
    next(new ApiError(500, 'Internal server error', error));
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  userDetails,
  refreshAccessToken,
  getCurrentUser,
  deleteUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  validateResetToken,
};
