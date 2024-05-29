import { TutorialModel, ITutorial } from '../models/tutorial.model';
import { TutorialRepository } from '../repositories/tutorial.repository';
import { TutorialService } from './tutorial.service';

const tutorialRepository = new TutorialRepository<ITutorial>(TutorialModel);

export class SpecialTutorialService extends TutorialService {
  async create(tutorial: ITutorial) {
    try {
      tutorial.special = true;
      const newTutorial = await tutorialRepository.create(tutorial);
      return newTutorial;
    } catch (error) {
      console.log(error);
      (error as any).status = 502;
      throw error;
    }
  }
}
