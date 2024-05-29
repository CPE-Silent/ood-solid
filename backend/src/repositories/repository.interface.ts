import { Document, FilterQuery } from 'mongoose';

export interface ICreateRepository<T extends Document> {
  create(item: Object): Promise<T>;
}

export interface IReadRepository<T extends Document> {
  findAll(condition?: FilterQuery<T>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}

export interface IUpdateRepository<T extends Document> {
  update(id: string, item: Partial<T>): Promise<T | null>;
}

export interface IDeleteRepository<T extends Document> {
  delete(id: string): Promise<boolean>;
  deleteAll(): Promise<void>;
}

export interface IRepository<T extends Document>
  extends ICreateRepository<T>,
    IReadRepository<T>,
    IUpdateRepository<T>,
    IDeleteRepository<T> {}
