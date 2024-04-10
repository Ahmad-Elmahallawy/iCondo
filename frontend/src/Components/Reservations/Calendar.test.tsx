import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Calendar from "./Calendar";
import { BrowserRouter } from "react-router-dom";

// Mock FullCalendar module because it's not important to test FullCalendar's internal behavior
jest.mock("@fullcalendar/react", () => () => <div>Mock Full Calendar</div>);

describe("<Calendar />", () => {
  // Replace with your actual full calendar event object type
  const mockEvent = {
    name: "Sample Event",
    unitNumber: "100",
    facility: "Pool",
    time: "12:00",
    date: "2024-04-24",
  };

  beforeEach(() => {
    // Mock navigate function provided by react-router-dom
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => jest.fn(),
    }));
  });

  test("renders calendar and modal components", () => {
    render(
      <BrowserRouter>
        <Calendar />
      </BrowserRouter>
    );

    expect(screen.getByText("Mock Full Calendar")).toBeInTheDocument();
    expect(screen.getByText("Common Facilities Calendar")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "My Reservations" })
    ).toBeInTheDocument();
  });

  test("clicking date opens the reservation modal", () => {
    render(
      <BrowserRouter>
        <Calendar />
      </BrowserRouter>
    );

    // Simulate date click here, then check if modal is in the document
  });

  test("clicking My Reservations button navigates to the My Reservations page", () => {
    render(
      <BrowserRouter>
        <Calendar />
      </BrowserRouter>
    );

    userEvent.click(screen.getByRole("button", { name: "My Reservations" }));
  });

  test("handles event creation", () => {
    render(
      <BrowserRouter>
        <Calendar />
      </BrowserRouter>
    );
  });
});
