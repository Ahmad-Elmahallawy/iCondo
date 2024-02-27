import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import { MemoryRouter } from "react-router-dom";
import CondoCreation from "./CondoCreation";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("CondoCreation component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CondoCreation />
      </MemoryRouter>
    );
  });

  it("submits form with valid input", async () => {
    render(
      <MemoryRouter>
        <CondoCreation />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Condo Unit ID"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Net Area"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Condo Fee"), {
      target: { value: "200" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create condo unit/i }));

    expect(screen.getByDisplayValue("123")).toBeInTheDocument();
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByDisplayValue("200")).toBeInTheDocument();
  });

  it("displays error message for condoFee input field when it is empty", async () => {
    render(
      <MemoryRouter>
        <CondoCreation />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Condo Fee"), {
      target: { value: "test this" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create condo unit/i }));

    await waitFor(() => {
      const errorElement = screen.getByText("Condo Fee must be a number", {
        selector: "p.error-msg",
      });
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("displays error messages for all required fields when submitted without filling them", async () => {
    render(
      <MemoryRouter>
        <CondoCreation />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button", { name: /create condo unit/i }));

    await waitFor(() => {
      const errorMessages = screen.getAllByText("Required", {
        selector: "p.error-msg",
      });
      errorMessages.forEach((errorMessage) => {
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.reset();
  });

  it("displays specific error message if condo unit creation fails due to conflict", async () => {
    mock.onPost("http://localhost:8000/api/condoUnits").reply(409);

    render(
      <MemoryRouter>
        <CondoCreation />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Condo Unit ID"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Net Area"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText("Condo Fee"), {
      target: { value: "200" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create condo unit/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid condo unit, must be unique")).toBeInTheDocument();
    });
  });
  
});
