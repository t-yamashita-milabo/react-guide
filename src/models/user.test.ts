import { isUser, User } from "./user";

describe("isUser", () => {
  it("should return true", () => {
    const alice: User = {
      id: 0,
      password: "password",
      username: "alice",
      active: true,
      type: "Admin",
      permissions: ["read", "write", "execute"],
    };

    expect(isUser(alice)).toBe(true);
  });
  it("should return false", () => {
    const bob = {
      id: "1",
      name: "bob",
      active: false,
      type: "User",
    };

    expect(isUser(bob)).toBe(false);
  });
});
