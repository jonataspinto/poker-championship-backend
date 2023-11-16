interface IDBProvider {
  save: <T, DTO>(data: T) => Promise<DTO>
  update: <DTO>(id: string, payload: DTO) => Promise<DTO>
  delete: (id: string) => Promise<string>
  getAll: <DTO>() => Promise<Array<DTO>>
  getById: <DTO>(id: string) => Promise<DTO>
  getByEmail: <DTO>(email: string) => Promise<DTO>
}
