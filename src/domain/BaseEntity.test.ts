import { BaseEntity } from "@Domains/BaseEntity";
import { idProviderMock, uuidMock } from "tests/idProviderMock";

describe("Base entity", () => {
  const baseEntity = new BaseEntity(idProviderMock);

  it("should generate a string uuid ", () => {
    expect(baseEntity.uuid).toEqual(uuidMock);
  });

  it("should to call getNew method", () => {
    expect(idProviderMock.getNew).toHaveBeenCalled();
  });
});
