import { Schema, model, connect } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type address = {
  street: string;
  city: string;
  country: string;
};

export type orders = {
  productName: string;
  price: number;
  quantity: number;
};

export type hobbies = [
  { gardening: string },
  { traveling: string },
  { youTubing: string },
];

export type order = [
  {
    type: string;
    productName: string;
    price: number;
    quantity: number;
  },
];

export type User = {
  userId: number;
  userName: UserName;
  age: number;
  email: string;

  isActive: {
    type: boolean;
    default: 'true';
  };

  hobbies: hobbies;
  address: address;
  orders: orders;
};
