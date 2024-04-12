import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import MyReservations from "./MyReservation";
import { confirmAlert } from "react-confirm-alert";

jest.mock("react-confirm-alert", () => ({
  confirmAlert: jest.fn(),
}));

describe("MyReservations", () => {
  // Test rendering of component
  test("renders MyReservations component", () => {
    render(<MyReservations />);
    expect(screen.getByText("My Reservations")).toBeInTheDocument();
  });

  // Test edit functionality
  test("opens modal on edit button click", () => {
    render(<MyReservations />);
    const editButton = screen.getAllByRole("button", { name: "edit" })[0];
    fireEvent.click(editButton);
    expect(
      screen.getByText("Modify Common Facility Reservation")
    ).toBeInTheDocument();
  });

  // Test cancel confirmation dialog
  test("opens confirmation dialog on cancel button click", () => {
    render(<MyReservations />);
    const cancelButton = screen.getAllByRole("button", { name: "cancel" })[0];
    fireEvent.click(cancelButton);
    expect(confirmAlert).toHaveBeenCalled();
  });

  // Test actual cancellation
  test("removes reservation on cancel confirmation", async () => {
    // Override the implementation for this test
    (confirmAlert as jest.Mock).mockImplementation(({ buttons }) => {
      buttons[0].onClick();
    });
    render(<MyReservations />);
    const initialReservations = screen.getAllByText(
      /Reservation booked for/
    ).length;
    const cancelButton = screen.getAllByRole("button", { name: "cancel" })[0];
    fireEvent.click(cancelButton);
    await waitFor(() => {
      expect(screen.getAllByText(/Reservation booked for/).length).toBe(
        initialReservations - 1
      );
    });
  });
});
