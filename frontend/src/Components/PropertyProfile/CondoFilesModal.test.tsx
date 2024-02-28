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

// Mock URL.createObjectURL
beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "blob:test-url");
});

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

  it("adds selected files to the list when files are uploaded", async () => {
    const handleClose = jest.fn();
    const { getByLabelText, findByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );

    const file = new File(["test content"], "test-file.pdf", {
      type: "application/pdf",
    });

    const input = getByLabelText("Upload File(s)") as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    const uploadedFile = await findByText("test-file.pdf");
    expect(uploadedFile).toBeInTheDocument();
  });

  it("displays download links for selected files", async () => {
    const handleClose = jest.fn();
    const { getByLabelText, findByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );

    const file = new File(["test content"], "test-file.pdf", {
      type: "application/pdf",
    });

    const input = getByLabelText("Upload File(s)") as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    const downloadLink = await findByText("Download");
    expect(downloadLink).toHaveAttribute("href", "blob:test-url");
  });
});