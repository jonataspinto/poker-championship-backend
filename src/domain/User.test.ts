import { User } from "@/domain/User";
import { idProviderMock, uuidMock } from "@/__mock__/idProviderMock";

const userDataMock: IUser = {
  name: "mark",
  email: "mark@email.com",
  uuid: "uuid",
};

describe("User domain", () => {
  const user = new User(userDataMock, idProviderMock);

  it("should to create a new user", () => {
    expect(user).toMatchObject(userDataMock);
  });

  it("should to call getNew method", () => {
    // expect(idProviderMock.getNew).toHaveBeenCalled();
    // expect(idProviderMock.getNew).toHaveReturned();
  });

  it("should return a uuid to equal uuidMock", () => {
    // expect(user.uuid).toEqual(uuidMock);
  });
});
