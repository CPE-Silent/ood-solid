// src/repositories/repository.interface.ts
import { Document } from 'mongoose';
export interface IRepository<T extends Document> {
  create(item: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  deleteAll(): Promise<void>;
}
