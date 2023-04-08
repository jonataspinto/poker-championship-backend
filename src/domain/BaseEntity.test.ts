import { BaseEntity } from "@Domains/BaseEntity";

const uuidMock = "poker";

const idProviderMock: IIdProvider = {
  getNew: jest.fn(() => uuidMock),
};

describe("Base entity", () => {
  const baseEntity = new BaseEntity(idProviderMock);

  it("should generate a string uuid ", () => {
    expect(baseEntity.uuid).toEqual(uuidMock);
  });

  it("should to call getNew method", () => {
    expect(idProviderMock.getNew).toHaveBeenCalled();
  });
});
