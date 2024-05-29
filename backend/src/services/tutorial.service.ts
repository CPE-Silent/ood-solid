import { Tutorial } from '../interfaces/tutorial.interface';
import { TutorialModel, ITutorial } from '../models/tutorial.model';
import { Repository } from '../repositories/repository';

export class TutorialService {
  private repository: Repository<ITutorial>;

  constructor() {
    this.repository = new Repository<ITutorial>(TutorialModel);
  }

  async create(tutorial: ITutorial): Promise<ITutorial> {
    return await this.repository.create(tutorial);
  }

  async findAll(): Promise<ITutorial[]> {
    return await this.repository.findAll();
  }

  async findAllPublished(): Promise<ITutorial[]> {
    return (await this.repository.findAll()).filter(
      (tutorial) => tutorial.published
    );
  }

  async findOne(id: string): Promise<ITutorial | null> {
    return await this.repository.findById(id);
  }

  async update(
    id: string,
    tutorial: Partial<Tutorial>
  ): Promise<ITutorial | null> {
    return await this.repository.update(id, tutorial);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.repository.deleteAll();
  }
}
