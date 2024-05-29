import { Router } from 'express';
import TutorialController from '../controllers/tutorial.controller';
import { AuthTokenMiddleware, UserExistsMiddleware } from '../middlewares/auth.middleware';

const userExists = new UserExistsMiddleware();
const authToken = new AuthTokenMiddleware();

authToken.setNext(userExists);

export default (router: Router) => {
  router.use('/users', (req, res, next) => {
    authToken.handle(req, res, next);
  });
  router.post('/tutorial', TutorialController.create);
  router.get('/tutorial', TutorialController.findAll);
  router.get('/tutorial/published', TutorialController.findAllPublished);
  router.get('/tutorial/:id', TutorialController.findOne);
  router.put('/tutorial/:id', TutorialController.update);
  router.delete('/tutorial/:id', TutorialController.delete);
  router.delete('/tutorial', TutorialController.deleteAll);
};
