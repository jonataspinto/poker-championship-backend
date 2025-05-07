export class DATABASE_MOCK<T, DTO> implements IDBProvider<T, DTO> {
  private data: Array<any> = [];

  async save(payload: T) {
    return new Promise<DTO>((resolve) => {
      const value = {
        ...payload,
        id: this.getUUID()
      } as DTO;
      this.data.push(value);
      resolve(value);
    });
  }

  async getAll() {
    return new Promise<DTO[]>((resolve) => {
      resolve(this.data);
    });
  }

  async update(id: string, payload: T) {
    return new Promise<DTO>((resolve) => {
      const updatedValue = { id, ...payload };
      this.data = this.data.map((row) => (row?.id === id ? updatedValue : row));
      resolve(updatedValue as DTO);
    });
  }

  async getById(id: string) {
    return new Promise<DTO>((resolve) => {
      resolve(this.data.find((row) => row.id === id));
    });
  }

  async getByEmail(email: string) {
    return new Promise<DTO>((resolve) => {
      resolve(this.data.find((row) => row.email === email));
    });
  }

  async delete(id: string) {
    return new Promise<string>((resolve) => {
      this.data = this.data.filter((row) => row.id !== id);
      resolve(id);
    });
  }

  getUUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
