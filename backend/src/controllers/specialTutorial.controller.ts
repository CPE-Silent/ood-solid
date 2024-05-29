import { Request, Response } from 'express';
import { SpecialTutorialService } from '../services/specialTutorial.service';
import { ErrorHandler } from '../middlewares/errorHandler.middlerware';
import { TutorialController } from './tutorial.controller';
import { TutorialModel, ITutorial } from '../models/tutorial.model';
import { TutorialRepository } from '../repositories/tutorial.repository';

const tutorialRepository = new TutorialRepository<ITutorial>(TutorialModel);
const specialTutorialService = new SpecialTutorialService(tutorialRepository); 

export class SpecialTutorialController extends TutorialController {
  @ErrorHandler()
  async create(req: Request, res: Response): Promise<void> {
    const tutorial = await specialTutorialService.create(req.body);
    res.status(201).json(tutorial);
  }
}
