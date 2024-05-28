import { Router } from 'express';

import TutorialController from '../controllers/tutorial.controller';

export default (router: Router) => {
  router.post('/tutorial', TutorialController.create);
  router.get('/tutorial', TutorialController.findAll);
  router.get('/tutorial/published', TutorialController.findAllPublished);
  router.get('/tutorial/:id', TutorialController.findOne);
  router.put('/tutorial/:id', TutorialController.update);
  router.delete('/tutorial/:id', TutorialController.delete);
  router.delete('/tutorial', TutorialController.deleteAll);
};
