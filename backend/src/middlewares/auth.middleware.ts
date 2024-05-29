// Middleware/AuthTokenMiddleware.ts
import e, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { Types } from 'mongoose';
import { IUser } from '../models/user.model';

interface UserPayload {
  email: string;
  role: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

interface Handler {
  setNext(handler: Handler): void;
  handle(req: Request, res: Response, next: NextFunction): void;
}

class AuthTokenMiddleware implements Handler {
  private userService: UserService;
  private nextHandler: Handler | undefined;
  constructor() {
    this.userService = new UserService();
  }
  setNext(handler: Handler): void {
    this.nextHandler = handler;
  }

  handle(req: Request, res: Response, next: NextFunction): void {
    this.verifyToken(req, res, () => {
      if (this.nextHandler) {
        this.nextHandler.handle(req, res, next);
      } else {
        next();
      }
    });
  }
  verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log('AuthTokenMiddleware');
      const secretKey = process.env.JWT_SECRET as string;
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new Error('No token found');
      }

      const decoded = jwt.verify(token, secretKey) as UserPayload;
      const user = await this.userService.getUserByEmail(decoded.email);

      req.user = user as IUser;
      next();
    } catch (error: any) {
      console.log(error);

      if (error instanceof jwt.JsonWebTokenError) {
        error.message = 'Invalid token';
        (error as any).status = 401;
      } else if (error instanceof jwt.TokenExpiredError) {
        error.message = 'Token expired';
        (error as any).status = 401;
      }
      res.status((error as any).status || 500).json({ message: error.message });
    }
  };
}

export { AuthTokenMiddleware };

class UserExistsMiddleware implements Handler {
  private nextHandler: Handler | undefined;
  constructor() {}
  setNext(handler: Handler): void {
    this.nextHandler = handler;
  }
  handle(req: Request, res: Response, next: NextFunction): void {
    this.userExists(req, res, () => {
      if (this.nextHandler) {
        this.nextHandler.handle(req, res, next);
      } else {
        next();
      }
    });
  }

  userExists(req: Request, res: Response, next: NextFunction) {
    console.log('UserExistsMiddleware');
    const user = req.user;
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
    }
    next();
  }
}

export { UserExistsMiddleware };


