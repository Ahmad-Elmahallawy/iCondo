import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import IndividualCondoProfile from "./IndividualCondoProfile";

describe("Renders information correctly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user information correctly", () => {
    render(<IndividualCondoProfile />);
    expect(screen.getByText("Unit number:")).toBeInTheDocument();
    expect(screen.getByText("Condo ID:")).toBeInTheDocument();
    expect(screen.getByText("Net area:")).toBeInTheDocument();
    expect(screen.getByText("Property Id:")).toBeInTheDocument();
    expect(screen.getByText("Condo Fee:")).toBeInTheDocument();
    expect(screen.getByText("Locker ID:")).toBeInTheDocument();
    expect(screen.getByText("Paid:")).toBeInTheDocument();
  });
});
