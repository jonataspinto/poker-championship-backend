import { IIdProvider, IUser } from "interfaces";
import { User } from "./User";

const uuidMock = "poker";

const userDataMock: IUser = {
  name: "mark",
  email: "mark@email.com",
} as IUser;

const idProviderMock: IIdProvider = {
  getNew: jest.fn(() => uuidMock),
};

describe("User domain", () => {
  const user = new User(userDataMock, idProviderMock);

  it("should to create a new user", () => {
    expect(user).toMatchObject(userDataMock);
  });

  it("should to call getNew method", () => {
    expect(idProviderMock.getNew).toHaveBeenCalled();
    expect(idProviderMock.getNew).toHaveReturned();
  });

  it("should return a uuid to equal uuidMock", () => {
    expect(user.uuid).toEqual(uuidMock);
  });
});
