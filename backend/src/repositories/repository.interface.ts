// src/repositories/repository.interface.ts
export interface IRepository<T> {
  create(item: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, item: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  deleteAll(): Promise<void>;
}
