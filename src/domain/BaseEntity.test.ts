import { idProviderMock, uuidMock } from "@/__mock__/idProviderMock";
import { BaseEntity } from "@/domain/BaseEntity";

describe("Base entity", () => {
  const baseEntity = new BaseEntity(idProviderMock);

  it("should generate a string uuid ", () => {
    expect(baseEntity.generateUuid()).toEqual(uuidMock);
  });

  it("should to call getNew method", () => {
    expect(idProviderMock.getNew).toHaveBeenCalled();
  });
});
