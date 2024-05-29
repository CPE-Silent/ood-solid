import { Model, Document, FilterQuery } from 'mongoose';
import {
  ICreateRepository,
  IDeleteRepository,
  IReadRepository,
  IUpdateRepository,
} from './repository.interface';

export class TutorialRepository<T extends Document>
  implements
    ICreateRepository<T>,
    IUpdateRepository<T>,
    IDeleteRepository<T>,
    IReadRepository<T>
{
  constructor(public model: Model<T>) {}

  async create(item: Object): Promise<T> {
    return await this.model.create(item);
  }

  async findAll(condition?: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(condition || {}).exec();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id }).exec();
    return result.deletedCount !== 0;
  }

  async deleteAll(): Promise<void> {
    await this.model.deleteMany({}).exec();
  }
}
