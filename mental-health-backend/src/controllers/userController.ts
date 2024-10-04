import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/authenticate';
export const getUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.user?.email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Prevent further execution
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user?.email },
      req.body,
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Prevent further execution
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
