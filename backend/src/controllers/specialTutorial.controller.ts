import { Request, Response } from 'express';
import { SpecialTutorialService } from '../services/specialTutorial.service';
import { ErrorHandler } from '../middlewares/errorHandler.middlerware';
import { TutorialController } from './tutorial.controller';

const specialTutorialService = new SpecialTutorialService();

export class SpecialTutorialController extends TutorialController {
  @ErrorHandler()
  async create(req: Request, res: Response): Promise<void> {
    const tutorial = await specialTutorialService.create(req.body);
    res.status(201).json(tutorial);
  }
}
