import { User } from './user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.id)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData); // built in static method

  // const user = new User(userData);

  // if (await user.isUserExists(userData.id)) {
  //   throw new Error('User already exists!');
  // }

  // const result = await user.save();

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.updateOne({ id }, { isDeleted: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
