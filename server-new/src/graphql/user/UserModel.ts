import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ILocalUser {
  email: string;
  password: string;
}

export interface IUser extends Document {
  methods: [string];
  local: ILocalUser;
}

const UserSchema: Schema = new Schema({
  methods: {
    type: [String],
    required: true,
  },
  local: {
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
});

UserSchema.pre<IUser>('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, (this as IUser).local.password);
  } catch (error) {
    throw new Error(error);
  }
};

export default mongoose.model<IUser>('User', UserSchema);
