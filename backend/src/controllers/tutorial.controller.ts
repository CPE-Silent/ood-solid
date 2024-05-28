// src/controllers/tutorial.controller.ts
import { Request, Response } from 'express';
import { TutorialService } from '../services/tutorial.service';

const tutorialService = new TutorialService();

class TutorialController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const tutorial = await tutorialService.create(req.body);
      res.status(201).json(tutorial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const tutorials = await tutorialService.findAll();
      res.status(200).json(tutorials);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findAllPublished(req: Request, res: Response): Promise<void> {
    try {
      const tutorials = await tutorialService.findAllPublished();
      res.status(200).json(tutorials);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const tutorial = await tutorialService.findOne(req.params.id);
      if (tutorial) {
        res.status(200).json(tutorial);
      } else {
        res.status(404).json({ message: 'Tutorial not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const tutorial = await tutorialService.update(req.params.id, req.body);
      if (tutorial) {
        res.status(200).json(tutorial);
      } else {
        res.status(404).json({ message: 'Tutorial not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const tutorial = await tutorialService.delete(req.params.id);
      if (tutorial) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Tutorial not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteAll(req: Request, res: Response): Promise<void> {
    try {
      await tutorialService.deleteAll();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TutorialController();
