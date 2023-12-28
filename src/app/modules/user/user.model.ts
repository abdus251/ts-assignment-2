import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TUser,
  UserModel,
  TUserName,
  TAddress,
  THobbies,
  TOrders,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxLength: [20, 'First Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: [true, 'Product Name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

const hobbiesSchema = new Schema<THobbies>({
  gardening: { type: String },
  traveling: { type: String },
  youTubing: { type: String },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  userName: {
    type: userNameSchema,
    required: [true, 'User Name is required'],
    unique: true,
  },
  age: { type: Number },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type',
    // },
  },
  isActive: { type: Boolean },
  hobbies: hobbiesSchema,
  address: addressSchema,
  orders: ordersSchema,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.isUserExits = async function (id: string) {
  const existingUser = await User.findOne({ id });

  return existingUser;
};

// pre save middleware/ hook: will work in create() save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  const user = this as TUser;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query middleware / hook
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// creating a custom static method

userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id });

  return existingUser;
};

// creating a custom instance method

// userSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await User.findOne({ id });

//   return existingUser;
// };

export const User = model<TUser, UserModel>('User', userSchema);
