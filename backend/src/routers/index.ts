import { Router } from 'express';
import auth from './auth.router';
import tutorial from './tutorial.router';
import user from './user.router';
import specialTutorial from './specialTutorial.router';

const router = Router();
export default (): Router => {
  auth(router);
  tutorial(router);
  specialTutorial(router);
  user(router);

  return router;
};
