import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CondoOwnerRequestsLandingPage from './CondoOwnerRequestsLandingPage';
import "@testing-library/jest-dom/extend-expect";

import OwnerRequestModal from '../Components/Requests/OwnerRequestModal';

// Mock the OwnerRequestSubject component since it's imported
jest.mock("../Components/Requests/OwnerRequestSubject", () => () => <div data-testid="owner-request-subject" />);

describe("CondoOwnerRequestsLandingPage", () => {
  test("renders correctly", () => {
    const { getByText } = render(<CondoOwnerRequestsLandingPage />);
    expect(getByText("My Requests")).toBeInTheDocument();
    expect(getByText("Compose New Request")).toBeInTheDocument();
  });

  test("opens modal when 'Compose New Request' button is clicked", () => {
    const { getByText, getByTestId } = render(<CondoOwnerRequestsLandingPage />);
    fireEvent.click(getByText("Compose New Request"));
    expect(getByTestId("new-request-modal")).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    const { getByText, getByTestId, queryByTestId } = render(<CondoOwnerRequestsLandingPage />);
    fireEvent.click(getByText("Compose New Request"));
    expect(getByTestId("new-request-modal")).toBeInTheDocument();
    fireEvent.click(getByTestId("close-modal-button")); 
  });
});