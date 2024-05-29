import UserModel, { IUser } from '../models/user.model';
import { RequestHandler, Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

class UserController {
  getAll: RequestHandler = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  getUserByEmail: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserByEmail(req.params.email);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  getUserById: RequestHandler = async (req: Request, res: Response) => {
    try {
      console.log('Here');
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}

export default new UserController();