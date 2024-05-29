// src/controllers/tutorial.controller.ts
import { Request, Response } from 'express';
import { TutorialService } from '../services/tutorial.service';
import { ErrorHandler } from '../middlewares/errorHandler.middlerware';
import { TutorialModel, ITutorial } from '../models/tutorial.model';
import { TutorialRepository } from '../repositories/tutorial.repository';

const tutorialRepository = new TutorialRepository<ITutorial>(TutorialModel);
const tutorialService = new TutorialService(tutorialRepository);

export class TutorialController {
  @ErrorHandler()
  async create(req: Request, res: Response): Promise<void> {
    const tutorial = await tutorialService.create(req.body);
    res.status(201).json(tutorial);
  }

  @ErrorHandler()
  async findAll(req: Request, res: Response): Promise<void> {
    const tutorials = await tutorialService.findAll(req);
    res.status(200).json(tutorials);
  }

  @ErrorHandler()
  async findAllPublished(req: Request, res: Response): Promise<void> {
    const tutorials = await tutorialService.findAllPublished();
    res.status(200).json(tutorials);
  }

  @ErrorHandler()
  async findOne(req: Request, res: Response): Promise<void> {
    const tutorial = await tutorialService.findOne(req.params.id);
    if (tutorial) {
      res.status(200).json(tutorial);
    } else {
      res.status(404).json({ message: 'Tutorial not found' });
    }
  }

  @ErrorHandler()
  async update(req: Request, res: Response): Promise<void> {
    const tutorial = await tutorialService.update(req.params.id, req.body);
    if (tutorial) {
      res.status(200).json(tutorial);
    } else {
      res.status(404).json({ message: 'Tutorial not found' });
    }
  }

  @ErrorHandler()
  async delete(req: Request, res: Response): Promise<void> {
    const tutorial = await tutorialService.delete(req.params.id);
    if (tutorial) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Tutorial not found' });
    }
  }

  @ErrorHandler()
  async deleteAll(req: Request, res: Response): Promise<void> {
    await tutorialService.deleteAll();
    res.status(204).send();
  }
}

// export default new TutorialController();
