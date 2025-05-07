export class TestAdapter<T, DTO extends { id: string }>
  implements IDBProvider<T, DTO>
{
  dataBase: Array<DTO> = [];

  async save(data: T): Promise<DTO> {
    const newData = {
      ...data,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2)
    } as unknown as DTO;

    this.dataBase.push(newData);

    return newData;
  }

  async getAll(): Promise<DTO[]> {
    try {
      const list = this.dataBase;

      return list;
    } catch (error) {
      // @ts-ignore
      return error;
    }
  }

  async getById(id: string): Promise<DTO> {
    const data = this.dataBase[0];

    return data;
  }

  async getByEmail(email: string): Promise<DTO> {
    const data = this.dataBase[0];

    // TODO : getByEmail logic

    return data;
  }

  async update(id: string, newData: T): Promise<DTO> {
    this.dataBase.find((data) => data.id === id);
    // TODO : update logic
    return newData as unknown as DTO;
  }

  async delete(id: string): Promise<string> {
    this.dataBase.findIndex((data) => data.id === id);
    return id;
  }
}
