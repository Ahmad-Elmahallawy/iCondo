import React from "react";
import { render, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CondoOwnerRequestsLandingPage from "./CondoOwnerRequestsLandingPage";
import api from "../api";
import userEvent from '@testing-library/user-event';

// Mocking the localStorage getItem method
Storage.prototype.getItem = jest.fn(() =>
 JSON.stringify({ id: 123, accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiQVQiLCJpYXQiOjE3MTA2NDcyMzUsImV4cCI6MTcxMDgyMDAzNX0.QLaSGJKvXM0emWppC2LWmFq39Km4ZpInlP47nIIYyPA" })
);

// Mocking the API module
jest.mock("../api", () => ({
 userCondoList: {
    getUserCondo: jest.fn(() => ({ data: [{ condo: { id: 456 } }] })),
 },
 properties: {
    getCondoProperty: jest.fn(() => ({ data: [{ id: 789 }] })),
 },
 companies: {
    getCompanyProperty: jest.fn(() => ({ data: [{ id: 987 }] })),
 },
 requests: {
    postOwnerRequest: jest.fn(),
 },
}));

describe("CondoOwnerRequestsLandingPage", () => {
 afterEach(() => {
    jest.clearAllMocks();
 });

 it("renders the component", () => {
    const { getByText } = render(<CondoOwnerRequestsLandingPage />);
    expect(getByText("My Requests")).toBeInTheDocument();
 });

 it("opens modal when 'Compose New Request' button is clicked", () => {
    const { getByText, getByTestId } = render(<CondoOwnerRequestsLandingPage />);
    const composeButton = getByText("Compose New Request");
    fireEvent.click(composeButton);
    const modal = getByTestId("new-request-modal");
    expect(modal).toBeInTheDocument();
 });

 it("closes modal when closed", async () => {
    const { getByText, getByLabelText, queryByTestId } = render(<CondoOwnerRequestsLandingPage />);
    const composeButton = getByText("Compose New Request");
    fireEvent.click(composeButton);
    const closeButton = getByLabelText("delete");
    fireEvent.click(closeButton);
    await waitForElementToBeRemoved(() => queryByTestId("new-request-modal"));
 });

//  it("submits modal form with correct data", async () => {
//     const { getByText, findByLabelText } = render(<CondoOwnerRequestsLandingPage />);
//     const composeButton = getByText("Compose New Request");
//     fireEvent.click(composeButton);
//     const subjectInput = await findByLabelText("Request"); // Use the label text to find the select input
//     userEvent.selectOptions(subjectInput, ["moving_in"]); // Use userEvent for select elements
//     const submitButton = getByText("Submit");
//     fireEvent.click(submitButton);
//     await waitFor(() =>
//       expect(api.requests.postOwnerRequest).toHaveBeenCalledWith(
//         987, // Ensure this matches the expected company ID
//         123, // Ensure this matches the expected user ID
//         "moving_in", // Ensure this matches the expected subject
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiQVQiLCJpYXQiOjE3MTA2NDcyMzUsImV4cCI6MTcxMDgyMDAzNX0.QLaSGJKvXM0emWppC2LWmFq39Km4ZpInlP47nIIYyPA" // Ensure this matches the expected access token
//       )
//     );
//  });
});
