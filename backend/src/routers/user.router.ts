import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { AuthTokenMiddleware, UserExistsMiddleware } from '../middlewares/auth.middleware';

const userExists = new UserExistsMiddleware();
const authToken = new AuthTokenMiddleware();

authToken.setNext(userExists);


export default (router: Router) => {
  router.use('/users', (req, res, next) => {
    authToken.handle(req, res, next);
  });
  
  router.route('/users')
    .get(UserController.getAll)
    .post(UserController.createUser);

  router.get('/users/email/:email', UserController.getUserByEmail);
  router.get('/users/id/:id', UserController.getUserById);
  router.put('/users/:id', UserController.updateUser);
  router.delete('/users/:id', UserController.deleteUser);
}