import { Router } from 'express';
import { TutorialController } from '../controllers/tutorial.controller';

const router = Router();

router.post('/', TutorialController.create);
router.get('/', TutorialController.findAll);
router.get('/published', TutorialController.findAllPublished);
router.get('/:id', TutorialController.findOne);
router.put('/:id', TutorialController.update);
router.delete('/:id', TutorialController.delete);
router.delete('/', TutorialController.deleteAll);

export default router;
