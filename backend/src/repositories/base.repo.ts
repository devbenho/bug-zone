export interface IBasicRepository<T> {
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<T | undefined>;
  getAll(): Promise<T[] | []>;
}
