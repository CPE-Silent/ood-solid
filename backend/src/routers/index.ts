import { Router } from 'express';
import auth from './auth.router';
import tutorial from './tutorial.router';

const router = Router();
export default (): Router => {
  auth(router);
  tutorial(router);

  return router;
};
