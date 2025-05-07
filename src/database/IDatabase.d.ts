interface IDBProvider<T, DTO> {
  save: (data: T) => Promise<DTO>;
  update: (id: string, payload: T) => Promise<DTO>;
  delete: (id: string) => Promise<string>;
  getAll: () => Promise<Array<DTO>>;
  getById: (id: string) => Promise<DTO>;
  getByEmail: (email: string) => Promise<DTO>;
}
