import { Router } from 'express';
import { TutorialController } from '../controllers/tutorial.controller';
import {
  AuthTokenMiddleware,
  UserExistsMiddleware,
} from '../middlewares/auth.middleware';

const tutorialController = new TutorialController();
const userExists = new UserExistsMiddleware();
const authToken = new AuthTokenMiddleware();

authToken.setNext(userExists);

export default (router: Router) => {
  router.use('/users', (req, res, next) => {
    authToken.handle(req, res, next);
  });
  router.post('/tutorial', tutorialController.create);
  router.get('/tutorial', tutorialController.findAll);
  router.get('/tutorial/published', tutorialController.findAllPublished);
  router.get('/tutorial/:id', tutorialController.findOne);
  router.put('/tutorial/:id', tutorialController.update);
  router.delete('/tutorial/:id', tutorialController.delete);
  router.delete('/tutorial', tutorialController.deleteAll);
};
