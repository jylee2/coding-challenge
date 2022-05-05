import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("renders entire app", () => {
  it("should have children", async () => {
    render(<App />);

    const titleElement = await screen.findByText("Analytics Dashboard");
    expect(titleElement).toBeInTheDocument();

    const overdueElement = await screen.findByText("Overdue Orders");
    expect(overdueElement).toBeInTheDocument();
  });
});
