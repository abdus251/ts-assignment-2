import { Schema, model, connect } from 'mongoose';
import { User, UserName, address, hobbies, orders } from './user.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema<address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const ordersSchema = new Schema<orders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const hobbiesSchema = new Schema<hobbies>({
  gardening: { type: String },
  traveling: { type: String },
  youTubing: { type: String },
});

const userSchema = new Schema<User>({
  userId: { type: Number },
  userName: userNameSchema,
  age: { type: Number },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: 'true' },
  hobbies: hobbiesSchema,
  address: addressSchema,
  orders: ordersSchema,
});

export const UserModel = model<User>('User', userSchema);
