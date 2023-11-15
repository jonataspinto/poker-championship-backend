interface IDBProvider {
  save: <T>(data: T) => Promise<T>
  update: <T>(id: string, payload: T) => Promise<T>
  delete: (id: string) => Promise<string>
  getAll: <T>() => Promise<Array<T>>
  getById: <T>(id: string) => Promise<T>
  getByEmail: <T>(email: string) => Promise<T>
}
