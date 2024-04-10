import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MCFR from "./MCFR";
import { Reservation } from "./MyReservation";

describe("<MCFR />", () => {
  const mockClose = jest.fn();
  const mockUpdate = jest.fn();
  const mockReservation: Reservation = {
    id: 1,
    location: "Sky Lounge",
    date: "2024-04-24",
    startTime: "20:00",
    endTime: "21:00",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal when open", () => {
    render(
      <MCFR
        isOpen={true}
        onClose={mockClose}
        reservation={mockReservation}
        availableFacilities={["Sky Lounge", "Sky Fitness", "Other Lounge"]}
        onReservationUpdate={mockUpdate}
      />
    );

    expect(
      screen.getByText("Modify Common Facility Reservation")
    ).toBeInTheDocument();
    // Add more expects to test if each form field is in the document with correct values
  });

  test("does not render modal when not open", () => {
    render(
      <MCFR
        isOpen={false}
        onClose={mockClose}
        reservation={mockReservation}
        availableFacilities={["Sky Lounge", "Sky Fitness", "Other Lounge"]}
        onReservationUpdate={mockUpdate}
      />
    );

    expect(
      screen.queryByText("Modify Common Facility Reservation")
    ).not.toBeInTheDocument();
  });
});
