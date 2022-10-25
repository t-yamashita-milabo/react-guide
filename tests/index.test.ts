import { test, expect, Locator } from "@playwright/test";

const buildGetRows = async (table: Locator) => {
  const headers = table.locator("th");
  const headerTexts: string[] = await headers.evaluateAll((hs) =>
    hs.map((h) => h.textContent ?? "")
  );
  console.log({ headerTexts });
  const cols = await headers.evaluateAll((hs) => hs.length);
  const colSpans = await headers.evaluateAll((hs) =>
    hs.reduce((acc, v) => acc + Number(v.getAttribute("colspan") || 0), 0)
  );
  console.log({ colSpans });
  const index = new Map(headerTexts.map((v, i) => [v, i]));

  const getRows = async (
    cells: { header: string; expected: number | string }[]
  ) =>
    cells.reduce(
      (acc, v) =>
        acc.locator(":scope", {
          has: table
            .page()
            .locator(`nth=${index.get(v.header)} >> text=${v.expected}`),
        }),
      table.locator("tr")
    );

  return getRows;
};

test.describe("index", () => {
  test("UserTable", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    await expect(page.locator("text=Users")).toBeVisible();

    // const table = page.locator("role=table");
    // await expect(
    //   table.locator("tr").locator(":scope", {
    //     has: table.page().locator("nth=0 >> text=0"),
    //   })
    // ).toBeVisible();

    const getRows = await buildGetRows(page.locator("role=table"));
    await expect(
      await getRows([{ header: "ユーザーID", expected: 0 }])
    ).toBeVisible();
  });
});
