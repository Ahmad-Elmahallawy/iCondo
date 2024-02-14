import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import KeyGeneration from "./KeyGeneration";

describe("KeyGeneration component", () => {
  it("renders with default user name", () => {
    const { getByText } = render(<KeyGeneration />);
    expect(getByText("[Name Here]")).toBeInTheDocument();
  });

  it("renders two buttons for condo owner and rental user", () => {
    const { getByText } = render(<KeyGeneration />);
    expect(getByText("Condo Owner")).toBeInTheDocument();
    expect(getByText("Rental User")).toBeInTheDocument();
  });

  it("renders a button to send registration key", () => {
    const { getByText } = render(<KeyGeneration />);
    expect(getByText("Send Registration Key to User")).toBeInTheDocument();
  });
});
