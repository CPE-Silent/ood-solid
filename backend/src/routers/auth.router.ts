import { Router } from 'express';
import UserController from '../controllers/auth.controller';

export default (router: Router) => {
  router.get('/auth', (req, res) => {
    res.send({ message: 'auth to backend-api!' });
  });
  router.post('/auth/register', UserController.register);
  router.post('/auth/login', UserController.login);
};
