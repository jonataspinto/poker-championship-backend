export const uuidMock = "poker";

export const idProviderMock: IIdProvider = {
  getNew: jest.fn(() => uuidMock),
};
