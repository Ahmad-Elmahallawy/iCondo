import { render, screen, fireEvent } from "@testing-library/react";
import PropertyListPage from "./PropertyListLandingPage";
import "@testing-library/jest-dom/extend-expect";

describe("PropertyListPage", () => {
  it("renders without crashing", () => {
    render(<PropertyListPage />);
    expect(screen.getByText("Properties List")).toBeInTheDocument();
  });

  it("disables the previous button initially", () => {
    render(<PropertyListPage />);
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeDisabled();
  });

  it("enables the next button initially", () => {
    render(<PropertyListPage />);
    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeEnabled();
  });

  it("does not update the displayed properties when previous button is clicked at start", () => {
    render(<PropertyListPage />);
    const propertyComponentsBefore =
      screen.getAllByTestId("property-component");
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    const propertyComponentsAfter = screen.getAllByTestId("property-component");
    expect(propertyComponentsBefore).toHaveLength(
      propertyComponentsAfter.length
    );
  });

  it("updates the displayed properties when next button is clicked", () => {
    render(<PropertyListPage />);
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const propertyComponents = screen.getAllByTestId("property-component");
    expect(propertyComponents).toHaveLength(1);
  });

  it("disables the next button when properties at the end of properties list is displayed", () => {
    render(<PropertyListPage />);
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const updatedNextButton = screen.getByTestId("next-button");
    expect(updatedNextButton).toBeDisabled();
  });

  it("enables the previous button when next button is clicked after being disabled", () => {
    render(<PropertyListPage />);
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeEnabled();
  });

  it("disables the previous button after clicking next button and then previous button", () => {
    render(<PropertyListPage />);
    const nextButton = screen.getByTestId("next-button");
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    const updatedPrevButton = screen.getByTestId("prev-button");
    expect(updatedPrevButton).toBeDisabled();
  });

  it("enables the previous button after clicking next button", () => {
    render(<PropertyListPage />);
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const prevButton = screen.getByTestId("prev-button");
    // fireEvent.click(prevButton);
    expect(prevButton).toBeEnabled();
  });

  it("does not update the displayed properties when next button is clicked at end", () => {
    render(<PropertyListPage />);
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    // fireEvent.click(nextButton);
    const propertyComponentsBefore =
      screen.getAllByTestId("property-component");
    fireEvent.click(nextButton);
    const propertyComponentsAfter = screen.getAllByTestId("property-component");
    expect(propertyComponentsBefore).toHaveLength(
      propertyComponentsAfter.length
    );
  });

  it('handles scroll correctly when direction is "prev"', () => {
    render(<PropertyListPage />);
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    const startIndices = screen.getAllByTestId("start-index");
    const startIndexText = startIndices[0].textContent;
    const startIndex = startIndexText ? parseInt(startIndexText) : 0;
    expect(startIndex).toBe(0);
  });

  it('handles scroll correctly when direction is "next"', () => {
    render(<PropertyListPage />);
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    const startIndices = screen.getAllByTestId("start-index");
    const startIndexText = startIndices[0].textContent;
    const startIndex = startIndexText ? parseInt(startIndexText) : 0;
    expect(startIndex).toBe(4);
  });
});
