export class TestAdapter<T extends {id: string}> implements IDatabase<T> {
  dataBase: Array<T> = []

  async save(data: T): Promise<T> {
    try {
      this.dataBase.push(data);
      return data;
    } catch (error) {
      // @ts-ignore
      return error;
    }
  }

  async getAll(): Promise<T[] | Error> {
    try {
      const list: T[] = this.dataBase;

      return list;
    } catch (error) {
      // @ts-ignore
      return error;
    }
  }

  async getById(id: string): Promise<T | Error> {
    const data: T | Error = this.dataBase[0];

    return data;
  }

  async update(id: string, newData: T): Promise<T | Error> {
    this.dataBase.find((data: T) => data.id === id);
    return newData;
  }

  async delete(id: string): Promise<string | Error> {
    this.dataBase.findIndex((data: T) => data.id === id);
    return id;
  }
}
