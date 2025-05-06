import { sanitizeObject } from ".";

describe("sanitizeObject", () => {
  it("should sanitize object with null values", () => {
    const value = {
      name: "John Doe",
      photoUrl: null
    };

    expect(sanitizeObject(value)).toMatchSnapshot();
  });

  it("should sanitize object with undefined values", () => {
    const value = {
      name: "John Doe",
      photoUrl: undefined
    };

    expect(sanitizeObject(value)).toMatchSnapshot();
  });

  it("should sanitize object with empty values", () => {
    const value = {
      name: "John Doe",
      photoUrl: ""
    };

    expect(sanitizeObject(value)).toMatchSnapshot();
  });
});
