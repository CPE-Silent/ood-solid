import { Router } from 'express';

import { login, register } from '../controllers/auth.controller';

export default (router: Router) => {
  router.get('/auth', (req, res) => {
    res.send({ message: 'auth to backend-api!' });
  });
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};
