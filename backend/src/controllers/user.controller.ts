// src/controllers/user.controller.ts
import { RequestHandler, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ErrorHandler } from '../middlewares/errorHandler.middlerware';

const userService = new UserService();

class UserController {
  @ErrorHandler()
  async getAll(req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }

  @ErrorHandler()
  async getUserByEmail(req: Request, res: Response): Promise<void> {
    const user = await userService.getUserByEmail(req.params.email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  @ErrorHandler()
  async getUserById(req: Request, res: Response): Promise<void> {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }

  @ErrorHandler()
  async createUser(req: Request, res: Response): Promise<void> {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  }

  @ErrorHandler()
  async updateUser(req: Request, res: Response): Promise<void> {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  }

  @ErrorHandler()
  async deleteUser(req: Request, res: Response): Promise<void> {
    await userService.deleteUser(req.params.id);
    res.status(204).json();
  }
}

export default new UserController();
