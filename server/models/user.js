import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {
  LOCAL,
  GOOGLE,
  FACEBOOK,
} from '../constants/auth';

const userSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: [LOCAL, GOOGLE, FACEBOOK],
    required: true,
  },
  [LOCAL]: {
    username: { type: String },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
  },
  [GOOGLE]: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  [FACEBOOK]: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isAdmin: { type: Boolean, default: false },
});

userSchema.pre('save', async function (next) {
  try {
    if (this.method === LOCAL) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(this[LOCAL].password, salt);
      this[LOCAL].password = passwordHash;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this[LOCAL].password);
  } catch (error) {
    throw new Error(error);
  }
};

export default mongoose.model('UserNewModel', userSchema);
