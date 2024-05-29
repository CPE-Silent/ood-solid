import { Router } from 'express';
import { SpecialTutorialController } from '../controllers/specialTutorial.controller';
import {
  AuthTokenMiddleware,
  UserExistsMiddleware,
} from '../middlewares/auth.middleware';

const specialTutorialController = new SpecialTutorialController();
const userExists = new UserExistsMiddleware();
const authToken = new AuthTokenMiddleware();

authToken.setNext(userExists);

export default (router: Router) => {
  router.post('/specialTutorial', (req, res, next) => {
    authToken.handle(req, res, () => {
      specialTutorialController.create(req, res);
    });
  });
};
