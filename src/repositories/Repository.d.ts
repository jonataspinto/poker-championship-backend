interface Repository<T> {
  create: (payload: T)=> Promise<T>
  findAll: () => Promise<Array<T>>
  findById: (id: string) => Promise<T>
  findByEmail: (email: string) => Promise<T>
  delete: (id: string) => Promise<string>
  update: (id: string, payload: T) => Promise<T>
}
