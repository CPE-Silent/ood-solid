import { RequestHandler, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { IUser } from '../models/user.model';

class AuthController {
  register: RequestHandler = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
      const existingUser = await UserModel.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });

      await newUser.save();

      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  login: RequestHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email: email });
      console.log('user: ' + user);
      let role = '';

      if (!user) {
        return res.status(401).json({ message: 'Invalid Email' });
      } else {
        role = user.role;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid Password' });
      }

      const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET || '', {
        expiresIn: '8h',
      });

      (req as any).user = user;

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expirationTime = currentTimestamp + 8 * 60 * 60;

      return res.status(200).json({ token, role, email, expirationTime });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

export default new AuthController();
