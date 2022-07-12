import { rest } from "msw";
import { server } from "jest.setup";

import { User } from "models/user";
import { createUser } from "./create-user";

describe("createUser", () => {
  it("should send user data and receive created data", async () => {
    const arg: User = {
      id: 0,
      username: "alice",
      password: "password",
      active: true,
      type: "Admin",
      permissions: ["read", "write"],
    };

    server.use(
      rest.post("/user", (req, res, ctx) => {
        return res(ctx.json(req.body));
      })
    );

    const res = await createUser(arg);
    expect(res).toStrictEqual(arg);
  });
});
