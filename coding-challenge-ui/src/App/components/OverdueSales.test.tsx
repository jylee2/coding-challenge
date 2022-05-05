import { render, screen } from "@testing-library/react";

import OverdueSales from "./OverdueSales";

describe("renders overdue sales table", () => {
  it("should show a title for the table", async () => {
    render(<OverdueSales />);

    const titleElement = await screen.findByText("Overdue Orders");
    expect(titleElement).toBeInTheDocument();
  });

  it("should show a table", async () => {
    render(<OverdueSales />);

    const tableElement = await screen.findByRole("table");
    expect(tableElement).toBeInTheDocument();

    const orderIdElement = await screen.findByText("ORDER ID");
    expect(orderIdElement).toBeInTheDocument();

    const orderValueElement = await screen.findByText("ORDER VALUE");
    expect(orderValueElement).toBeInTheDocument();

    const daysOverdueElement = await screen.findByText("DAYS OVERDUE");
    expect(daysOverdueElement).toBeInTheDocument();
  });
});
