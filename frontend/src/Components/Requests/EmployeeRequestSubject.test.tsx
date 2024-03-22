import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios'; // Mock Axios
import EmployeeRequestSubject from './EmployeeRequestSubject';

// Mock Axios for API requests
jest.mock('axios');

// Test Suite for EmployeeRequestSubject component
describe('EmployeeRequestSubject Component', () => {
 // Mock fetched requests data
 const fetchedRequestsMock = [
    { requestType: 'access_request', status: 'Pending', id: '1' },
    { requestType: 'deficiency_report', status: 'In Progress', id: '2' },
    // Add more mock data as needed
 ];

 // Reset mocks after each test
 afterEach(() => {
    jest.resetAllMocks();
 });

 // Test Case: Component renders correctly with fetched requests
 it('should render correctly with fetched requests', async () => {
    // Mock Axios response for fetching requests
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: fetchedRequestsMock,
    });

    // Render the component
    const { getByText } = render(<EmployeeRequestSubject />);

    // Wait for the loading screen to disappear
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Check if the request items are rendered
    fetchedRequestsMock.forEach((request) => {
      expect(getByText(request.requestType)).toBeInTheDocument();
      expect(getByText(request.status)).toBeInTheDocument();
    });
 });

 // Test Case: Handling request status update
 it('should handle request status update correctly', async () => {
    // Mock Axios response for fetching requests
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: fetchedRequestsMock,
    });

    // Mock Axios response for updating request status
    (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValueOnce({
      data: { id: '1' }, // Mock response data
    });

    // Render the component
    const { getByText, getByRole } = render(<EmployeeRequestSubject />);

    // Wait for the loading screen to disappear
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Simulate clicking on the "In Progress" button for the first request
    fireEvent.click(getByRole('button', { name: /In Progress/i }));

    // Wait for the status update to be processed
    await waitFor(() => expect(axios.patch).toHaveBeenCalled());

    // Check if the request status is updated in the UI
    expect(getByText('In Progress')).toBeInTheDocument();
 });

 // Add more test cases as needed to cover different scenarios
});
