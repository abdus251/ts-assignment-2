import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type THobbies = {
  gardening: string;
  traveling: string;
  youTubing: string;
};

export type TOrder = [
  {
    type: string;
    productName: string;
    price: number;
    quantity: number;
  },
];

export type TUser = {
  userId: number;
  password: string;
  userName: TUserName;
  age: number;
  email: string;

  isActive: {
    type: boolean;
    default: 'true';
  };
  hobbies: THobbies;
  address: TAddress;
  orders: TOrders;
  isDeleted: boolean;
};

// for creating static

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
}

// for creating instacne

// export interface UserMethods  {
//   isUserExists(id: string): Promise<TUser | null>;
// };
// export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
