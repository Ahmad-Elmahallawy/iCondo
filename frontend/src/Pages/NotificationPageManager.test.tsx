import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotificationPageManager from "./NotificationPageManager";
import "@testing-library/jest-dom/extend-expect";

describe("NotificationPageManager component", () => {
  it("renders without crashing", () => {
    render(<NotificationPageManager />);
  });

  it("renders notifications heading", () => {
    const { getByText } = render(<NotificationPageManager />);
    expect(getByText("Notifications")).toBeInTheDocument();
  });

  it("renders three notification items", () => {
    const { getAllByRole } = render(<NotificationPageManager />);
    const notificationItems = getAllByRole("button");
    expect(notificationItems.length).toBe(3);
  });

  it("toggles notification items when clicked", () => {
    const { getAllByRole } = render(<NotificationPageManager />);
    const notificationItems = getAllByRole("button");

    // Click the first notification item
    fireEvent.click(notificationItems[0]);
    expect(notificationItems[0].textContent).toBe("✓");

    // Click it again to toggle back
    fireEvent.click(notificationItems[0]);
    expect(notificationItems[0].textContent).toBe("×");
  });

  it("correctly toggles the class of notification buttons when clicked", () => {
    const { getAllByRole } = render(<NotificationPageManager />);
    const buttons = getAllByRole("button");

    // Initial class check
    expect(buttons[0]).not.toHaveClass("checked");
    expect(buttons[1]).not.toHaveClass("checked");
    expect(buttons[2]).not.toHaveClass("checked");

    // Click the first button and check classes
    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveClass("checked");
    expect(buttons[1]).not.toHaveClass("checked");
    expect(buttons[2]).not.toHaveClass("checked");

    // Click the second button and check classes
    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveClass("checked");
    expect(buttons[1]).toHaveClass("checked");
    expect(buttons[2]).not.toHaveClass("checked");

    // Click the first button again to uncheck
    fireEvent.click(buttons[0]);
    expect(buttons[0]).not.toHaveClass("checked");
    expect(buttons[1]).toHaveClass("checked");
    expect(buttons[2]).not.toHaveClass("checked");
  });
});
