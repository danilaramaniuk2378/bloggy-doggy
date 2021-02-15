import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../user/UserModel';

export interface IFlat extends Document {
  ownerId: IUser['_id'];
  price: number;
  phone?: string;
}

const FlatSchema: Schema = new Schema({
  ownerId: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String },
});

export default mongoose.model<IFlat>('Flat', FlatSchema);
