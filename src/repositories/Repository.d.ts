interface Repository<T, DTO> {
  create: (payload: T) => Promise<DTO>;
  findAll: (query?: Record<string, any>) => Promise<Array<DTO>>;
  findById: (id: string) => Promise<DTO>;
  delete: (id: string) => Promise<string>;
  update: (id: string, payload: T) => Promise<DTO>;
}

interface PlayerRepository<T, DTO> extends Repository<T, DTO> {
  findByEmail: (email: string) => Promise<DTO>;
}
