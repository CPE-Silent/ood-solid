import { Router } from 'express';
import UserController from '../controllers/user.controller';

export default (router: Router) => {
  router.get('/users', UserController.getAll);
  router.get('/users/:email', UserController.getUserByEmail);
  router.get('/users/:id', UserController.getUserById);
  router.post('/users', UserController.createUser);
  router.put('/users/:id', UserController.updateUser);
  router.delete('/users/:id', UserController.deleteUser);
}