interface Repository<T, DTO> {
  create: (payload: T)=> Promise<DTO>
  findAll: () => Promise<Array<DTO>>
  findById: (id: string) => Promise<DTO>
  delete: (id: string) => Promise<string>
  update: (id: string, payload: DTO) => Promise<DTO>
}
