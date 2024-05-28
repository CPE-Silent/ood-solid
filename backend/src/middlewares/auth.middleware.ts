import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserRequest extends Request {
  userData?: JwtPayload; // Define the type of 'userData' property as JwtPayload
}

export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No Token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;

    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
      return res.status(401).json({ message: 'Authentication failed: Token has expired' });
    }

    // Set 'userData' property on the request object
    req.userData = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
