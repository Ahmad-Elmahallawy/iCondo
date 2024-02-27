// List.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import List from "./List";

describe("List Component", () => {
  it("renders items correctly", () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    const renderItem = jest.fn((item) => <div>{item}</div>);
    const { getByText } = render(<List items={items} renderItem={renderItem} />);

    items.forEach((item) => {
      expect(getByText(item)).toBeInTheDocument();
    });
  });

  it("disables prev button when startIndex is 0", () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    const { getByTestId } = render(<List items={items} renderItem={() => null} />);
    const prevButton = getByTestId("prev-button");

    expect(prevButton).toBeDisabled();
  });

  it("disables next button when startIndex + 4 >= items.length", () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    const { getByTestId } = render(<List items={items} renderItem={() => null} />);
    const nextButton = getByTestId("next-button");

    expect(nextButton).toBeDisabled();
  });

  it("handles click on prev button correctly", () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    const { getByTestId } = render(<List items={items} renderItem={() => null} />);
    const prevButton = getByTestId("prev-button");

    fireEvent.click(prevButton);

    expect(prevButton).toBeDisabled();
  });

  it("handles click on next button correctly", () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    const { getByTestId } = render(<List items={items} renderItem={() => null} />);
    const nextButton = getByTestId("next-button");

    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });
  it("handles scroll correctly", () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"];
    const { getByTestId } = render(<List items={items} renderItem={() => null} />);
    const prevButton = getByTestId("prev-button");
    const nextButton = getByTestId("next-button");
    const listContainer = getByTestId("list-container");
  
    fireEvent.click(nextButton); // Click once to go to the next page
    fireEvent.click(nextButton); // Click again to go to the next page
    fireEvent.scroll(listContainer, { target: { scrollLeft: 200 } }); // Simulate scrolling
  
    // Since we scrolled, startIndex should have changed
    expect(prevButton).not.toBeDisabled(); // Prev button should be enabled after scrolling
    expect(nextButton).toBeDisabled(); // Next button should be enabled after scrolling
  });

  it("enables next button after scrolling", () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"];
    const { getByTestId } = render(<List items={items} renderItem={() => null} />);
    const prevButton = getByTestId("prev-button");
    const nextButton = getByTestId("next-button");
    const listContainer = getByTestId("list-container");
  
    // Scroll to a position where the start index becomes greater than 0
    fireEvent.scroll(listContainer, { target: { scrollLeft: 200 } });
  
    // Since we scrolled, startIndex should have changed and nextButton should be enabled
    expect(prevButton).toBeDisabled(); // Prev button should still be disabled after scrolling
    expect(nextButton).not.toBeDisabled(); // Next button should be enabled after scrolling
  });

  it("handles scroll correctly for next button", () => {
    const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8","Item 9","Item 10"];
    const { getByTestId } = render(<List items={items} renderItem={() => null} />);
    const prevButton = getByTestId("prev-button");
    const nextButton = getByTestId("next-button");
    const listContainer = getByTestId("list-container");
  
    // Scroll to a position where the start index becomes greater than 0
    fireEvent.scroll(listContainer, { target: { scrollLeft: 200 } });
  
    // Since we scrolled, startIndex should have changed and nextButton should be enabled
    expect(prevButton).toBeDisabled(); // Prev button should still be disabled after scrolling
    expect(nextButton).not.toBeDisabled(); // Next button should be enabled after scrolling
  
    // Click the next button to move to the next page
    fireEvent.click(nextButton);
  
    // Since we clicked next, startIndex should have incremented by 4
    expect(prevButton).not.toBeDisabled(); // Prev button should be enabled after clicking next
    expect(nextButton).not.toBeDisabled(); // Next button should still be enabled
  });
});
