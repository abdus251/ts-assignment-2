import { Request, Response } from 'express';
import { UserServices } from './modules/user/user.service';
import userValidationSchema from './modules/user/user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Joi
    const { user: userData } = req.body;
    const { error } = userValidationSchema;
    // console.log({ error }, { value });

    const result = await UserServices.createUserIntoDB(userData);

    if (error) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: error,
      });
    }

    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users are fetched successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: err,
    });
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
