import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  findByTestId,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import CondoFilesModal from "./CondoFilesModal";

describe("CondoFilesModal component", () => {
  it("renders without crashing", () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );
    expect(getByText("Condo Files")).toBeInTheDocument();
  });

  it('displays "No Files Are Available" message when no files are selected', () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );
    expect(
      getByText("No Files Are Available Right Now For This Property")
    ).toBeInTheDocument();
  });

  it("closes the modal when Close button is clicked", () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );

    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  // TODO: Download functionality test
  // TODO: Upload functionality test

});
