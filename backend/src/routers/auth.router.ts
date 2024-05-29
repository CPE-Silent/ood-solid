import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

export default (router: Router) => {
  router.get('/auth', (req, res) => {
    res.send({ message: 'auth to backend-api!' });
  });
  router.post('/auth/register', AuthController.register);
  router.post('/auth/login', AuthController.login);
};