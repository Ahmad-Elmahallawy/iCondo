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
import axios from "axios";

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
    expect(downloadLink).toBeInTheDocument();
  });
  
  it("downloads the selected file when 'Download' button is clicked", async () => {
    const handleClose = jest.fn();
    const { getByLabelText, findByText, getByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );
  
    const file = new File(["test content"], "test-file.pdf", {
      type: "application/pdf",
    });
  
    const input = getByLabelText("Upload File(s)") as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
  
    const downloadButton = await findByText("Download");
    fireEvent.click(downloadButton);
  
    expect(getByText("test-file.pdf")).toBeInTheDocument(); 
  });
  it("closes the modal when 'Close' button is clicked", () => {
    const handleClose = jest.fn();
    const { getByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );
  
    const closeButton = getByText("Close");
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalled();
  });
  
  it("does not add files when no files are selected for upload", async () => {
    const handleClose = jest.fn();
    const { getByLabelText, findByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );
  
    const input = getByLabelText("Upload File(s)") as HTMLInputElement;
    fireEvent.change(input, { target: { files: null } });
  
    // Wait for any rendering changes
    await waitFor(() => {});
  
    // Ensure no file is added to the list
    expect(await findByText("No Files Are Available Right Now For This Property")).toBeInTheDocument();
  });

  it("displays uploaded file names correctly", async () => {
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
  
  it("displays a 'Download' button for each uploaded file", async () => {
    const handleClose = jest.fn();
    const { getByLabelText, findByText } = render(
      <CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />
    );
  
    const file = new File(["test content"], "test-file.pdf", {
      type: "application/pdf",
    });
  
    const input = getByLabelText("Upload File(s)") as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
  
    // Find the "Download" button for the uploaded file
    const downloadButton = await findByText("Download");
  
    // Ensure the "Download" button is present
    expect(downloadButton).toBeInTheDocument();
  
    // Click the "Download" button
    fireEvent.click(downloadButton);
  
  });
  
  it("displays uploaded file in the list when file is uploaded", async () => {
    const handleClose = jest.fn();
  
    // Render the component
    render(<CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />);
  
    // Create a mock file
    const file = new File(["test content"], "test-file.pdf", {
      type: "application/pdf",
    });
  
    // Trigger a file upload event
    fireEvent.change(screen.getByLabelText("Upload File(s)"), { target: { files: [file] } });
  
    // Ensure uploaded file is displayed in the list
    expect(screen.getByText("test-file.pdf")).toBeInTheDocument();
  });
  
  it("renders modal with appropriate UI elements and messages", () => {
    const handleClose = jest.fn();
  
    // Render the component
    render(<CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />);
  
    // Ensure modal header is rendered
    expect(screen.getByText("Condo Files")).toBeInTheDocument();
  
    // Ensure file upload input is rendered
    expect(screen.getByLabelText("Upload File(s)")).toBeInTheDocument();
  
    // Ensure 'No Files Are Available' message is rendered
    expect(screen.getByText("No Files Are Available Right Now For This Property")).toBeInTheDocument();
  
    // Ensure 'Submit' and 'Close' buttons are rendered
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for handling empty response data
  it("handles empty response data gracefully", async () => {
    const handleClose = jest.fn();
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: [] }));

    render(<CondoFilesModal isCondoFilesOpen={true} handleClose={handleClose} />);

    await waitFor(() => {});

    expect(screen.getByText("No Files Are Available Right Now For This Property")).toBeInTheDocument();
  });

});