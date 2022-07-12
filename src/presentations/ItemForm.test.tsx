import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@storybook/testing-library";

import ItemForm, { ItemFormInput } from "./ItemForm";

describe("ItemForm", () => {
  it("should collect expected form values", async () => {
    const mockOnSubmit = jest.fn();

    render(<ItemForm onSubmit={mockOnSubmit} />);

    userEvent.type(screen.getByLabelText("アイテム名"), "item0");
    userEvent.type(screen.getByLabelText("価格"), "100");

    userEvent.click(screen.getByRole("button", { name: "保存" }));
    await waitFor(() => {
      expect(mockOnSubmit).toBeCalled();
    });

    const arg = mockOnSubmit.mock.calls[0][0] as ItemFormInput;
    expect(arg).toStrictEqual({
      itemName: "item0",
      price: 100,
    });
  });
});
