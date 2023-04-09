interface IDatabase<T> {
  save: (data: T) => Promise<T | Error>;
  getAll: (key?: string, queryParam?: string | number) => Promise<T[] | Error>;
  getById: (id: string) => Promise<T | Error>;
  getByKey: (key?: string, value?: string) => Promise<T | Error>;
  update: (id: string, data: T) => Promise<T | Error>;
  delete: (id: string) => Promise<string | Error>;
}
