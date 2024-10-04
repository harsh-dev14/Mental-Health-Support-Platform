import { Request, Response } from 'express';
import {
  signUp as cognitoSignUp,
  confirmSignUp as cognitoConfirmSignUp,
  signIn as cognitoSignIn,
} from '../services/cognitoServices';

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const data = await cognitoSignUp(email, password);
    res.status(201).json({
      message: 'User registered successfully. Please confirm your email.',
      data,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const confirmSignUp = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const data = await cognitoConfirmSignUp(email, code);
    res.status(200).json({ message: 'User confirmed successfully.', data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const data = await cognitoSignIn(email, password);
    res.status(200).json({ message: 'User signed in successfully.', data });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
