import { Model, Document } from 'mongoose';
import { Repository } from './repository';

export class TutorialRepository<T extends Document> extends Repository<T> {
	constructor(private tutorialModel: Model<T>) {
		super(tutorialModel);
	}

	async findAll(condition: any): Promise<T[]> {
		try {
			return await this.tutorialModel.find(condition || {}).exec();
		} catch (err) {
			throw new Error('Some error occurred while retrieving tutorials.');
		}
	}
}
