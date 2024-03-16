import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import OwnerRequestModal from "./OwnerRequestModal";

describe("OwnerRequestModal", () => {
  it("renders correctly", () => {
    const { getByText } = render(<OwnerRequestModal open={true} onClose={() => {}} />);
    expect(getByText("Subject:")).toHaveTextContent("Subject:");
    expect(getByText("Submit")).toHaveTextContent("Submit");
  });

  it("calls onClose function when Submit button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(<OwnerRequestModal open={true} onClose={onCloseMock} />);
    fireEvent.click(getByText("Submit"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose function when Delete button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByLabelText } = render(<OwnerRequestModal open={true} onClose={onCloseMock} />);
    fireEvent.click(getByLabelText("delete"));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
