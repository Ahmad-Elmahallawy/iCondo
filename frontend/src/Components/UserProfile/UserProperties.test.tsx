import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Properties from "./UserProperties";

describe("Properties Component", () => {
  test("renders property details correctly", () => {
    render(<Properties />);
    const title = screen.getByRole("heading", {
      name: /Beautiful 3 1\/3 condo/i,
    });
    const price = screen.getByText(/\$2000 per month/i);
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  test("like button toggles liked state", () => {
    render(<Properties />);
    const likeButton = screen.getByRole("button", { name: /Like/i });
    fireEvent.click(likeButton);
    expect(likeButton).toHaveTextContent("Unlike");
    fireEvent.click(likeButton);
    expect(likeButton).toHaveTextContent("Like");
  });

  test("message button is present", () => {
    render(<Properties />);
    const messageButton = screen.getByRole("button", { name: /Message/i });
    expect(messageButton).toBeInTheDocument();
  });

  test('initially, the like button should display "Like"', () => {
    render(<Properties />);
    const likeButton = screen.getByRole("button", { name: /Like/i });
    expect(likeButton).toHaveTextContent("Like");
  });

  test("clicking the message button triggers handleMessageClick", () => {
    render(<Properties />);
    const messageButton = screen.getByRole("button", { name: /Message/i });
    fireEvent.click(messageButton);
    // Add assertions or mock functionality to test the expected behavior
  });
  // Additional tests for any other interactive elements or edge cases
});
