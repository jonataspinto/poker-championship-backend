export interface IDB<T> {
  save: (data: T) => Promise<T>;
  fetch: () => Promise<T>;
  getById: (id: string) => Promise<T>;
  update: (id: string, data: T) => Promise<T>;
  delete: (id: string) => Promise<T>;
}
