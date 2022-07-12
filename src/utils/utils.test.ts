import { fmtDate } from "./utils";

describe("fmtDate", () => {
  it("should return 2022/07/08", () => {
    const arg = new Date(2022, 7 - 1, 8);

    expect(fmtDate(arg)).toMatch(/2022\/07\/08/);
  });
});
