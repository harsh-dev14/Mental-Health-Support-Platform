import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any; // You can specify a more precise type here
}

const authenticate: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'No token provided.' });
    return; // Prevent further execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
    return; // Prevent further execution
  }
};

export default authenticate;
