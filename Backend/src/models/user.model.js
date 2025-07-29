import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { Address } from './address.model.js';
import { Order } from './orders.model.js';
import { Wishlist } from './wishlist.model.js';
import { Cart } from './cart.model.js';

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  refreshToken: {
    type: String
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true
});

UserSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
});

UserSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password)
};

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          fullName: this.fullName,
          role: this.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d"
      }
  )
};

UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "10d"
      }
  )
};

UserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const userId = this._id;

    console.log(`Cascade deleting references for user: ${userId}`);

    await Promise.all([
      Order.deleteMany({ user: userId }),
      Address.deleteMany({ user: userId }),
      Wishlist.deleteMany({ user: userId }),
      Cart.deleteMany({ user: userId }) 
    ]);

    console.log(`Cascade delete completed for user: ${userId}`);
    next();
  } catch (error) {
    console.error('Error in user cascade deletion:', error);
    next(error);
  }
});

export const User = mongoose.model("User", UserSchema);