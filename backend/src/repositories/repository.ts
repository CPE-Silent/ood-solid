import { Model, Document } from 'mongoose';
import { IRepository } from './repository.interface';

export class Repository<T extends Document> implements IRepository<T> {
  constructor(private model: Model<T>) {}

  async create(item: Object): Promise<T> {
    return await this.model.create(item); 
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
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
