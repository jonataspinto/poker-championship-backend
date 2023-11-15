class DATABASE_MOCK implements IDBProvider {
  private data: Array<any> = [];

  async save<T>(payload: T): Promise<T> {
    return new Promise((resolve) => {
      const value = {
        ...payload,
        id: this.getUUID(),
      };
      this.data.push(value);
      resolve(value);
    });
  }

  async getAll<T>(): Promise<Array<T>> {
    return new Promise((resolve) => {
      resolve(this.data as Array<T>);
    });
  }

  async update<T>(id: string, payload: T): Promise<T> {
    return new Promise((resolve) => {
      const updatedValue = ({ id, ...payload });
      this.data = this.data.map((row) => (row?.id === id ? updatedValue : row));
      resolve(updatedValue);
    });
  }

  async getById<T>(id: string): Promise<T> {
    return new Promise((resolve) => {
      resolve(this.data.find((row) => row.id === id) as T);
    });
  }

  async getByEmail<T>(email: string): Promise<T> {
    return new Promise((resolve) => {
      resolve(this.data.find((row) => row.email === email) as T);
    });
  }

  async delete(id: string): Promise<string> {
    return new Promise((resolve) => {
      this.data = this.data.filter((row) => row.id !== id);
      resolve(id);
    });
  }

  getUUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export default new DATABASE_MOCK();
