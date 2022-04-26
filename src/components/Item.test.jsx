import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Item from "./Item";

test("clicking the button calls event handler once", async () => {
  const item = {
    latin: "latin info",
    common: ["common 1", "common 2"],
    description: {
      cap: "cap info",
      gills: "gills info",
      stem: "stem info",
      flesh: "flesh info",
      spores: "spores info",
    },
    habitat: "habitat info",
    flavour: "flavour info",
    frequency: "frequency info",
    image: "image info",
  };

  const mockHandler = jest.fn();

  render(<Item item={item} found handleToggleFound={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("toggle found");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
