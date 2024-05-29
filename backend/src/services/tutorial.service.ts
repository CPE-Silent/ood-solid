import { Tutorial } from '../interfaces/tutorial.interface';
import { ITutorial } from '../models/tutorial.model';
import { IRepository } from '../repositories/repository.interface';


export class TutorialService {
  constructor(private tutorialRepository: IRepository<ITutorial>) {}
	async create(tutorial: ITutorial) {
		try {
			const newTutorial = await this.tutorialRepository.create(tutorial);
			return newTutorial;
		} catch (error) {
			console.log(error);
			(error as any).status = 502;
			throw error;
		}
	}

	async findAll(req: any) {
		try {
			const title = req.query.title;
			const condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};
			const tutorials = await this.tutorialRepository.findAll(condition);
			return tutorials;
		} catch (err) {
			throw new Error('Some error occurred while retrieving tutorials.');
		}
	}

	async findAllPublished() {
		try {
			const condition = { published: true };
			const tutorials = await this.tutorialRepository.findAll(condition);
			return tutorials;
		} catch (err) {
			throw new Error('Some error occurred while retrieving tutorials.');
		}
	}

	async findOne(id: string) {
		try {
			const tutorials = await this.tutorialRepository.findById(id);
			return tutorials;
		} catch (err) {
			throw new Error('Some error occurred while retrieving tutorials.');
		}
	}

	async update(id: string, tutorial: Partial<Tutorial>): Promise<ITutorial | null> {
		const tutorials = await this.tutorialRepository.update(id, tutorial);
		return tutorials;
	}

	async delete(id: string): Promise<boolean> {
		try {
			const tutorials = await this.tutorialRepository.delete(id);
			return tutorials;
		} catch (err) {
			throw new Error('Some error occurred while deleting tutorials.');
		}
	}

	async deleteAll(): Promise<void> {
		try {
			const tutorials = await this.tutorialRepository.deleteAll();
			return tutorials;
		} catch (err) {
			throw new Error('Some error occurred while deleting all tutorials.');
		}
	}
}
