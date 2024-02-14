// UsersList.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UsersList from "./UsersList";

describe("UsersList component", () => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  it("renders user names correctly", () => {
    const handleUserItemClick = jest.fn();
    const { getByText } = render(
      <UsersList handleUserItemClick={handleUserItemClick} />
    );

    users.forEach((user) => {
      expect(getByText(user.name)).toBeInTheDocument();
    });
  });

  it("calls handleUserItemClick with correct arguments when a user is clicked", () => {
    const handleUserItemClick = jest.fn();
    const { getByText } = render(
      <UsersList handleUserItemClick={handleUserItemClick} />
    );

    users.forEach((user) => {
      fireEvent.click(getByText(user.name));
      expect(handleUserItemClick).toHaveBeenCalledWith(user.id, user.name);
    });
  });

});
