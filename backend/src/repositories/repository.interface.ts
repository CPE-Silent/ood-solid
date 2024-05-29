import { FilterQuery } from 'mongoose';
export interface ICreateRepository<T> {
  create(item: Object): Promise<T>;
}

export interface IReadRepository<T> {
  findAll(condition?: FilterQuery<T>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}

export interface IUpdateRepository<T> {
  update(id: string, item: Partial<T>): Promise<T | null>;
}

export interface IDeleteRepository<T> {
  delete(id: string): Promise<boolean>;
  deleteAll(): Promise<void>;
}
