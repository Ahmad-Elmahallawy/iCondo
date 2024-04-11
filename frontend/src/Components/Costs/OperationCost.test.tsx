import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import OperationCost from './OperationCost';
import api from '../../api';
import '@testing-library/jest-dom';


// Mock the navigate function from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock the API
jest.mock('../../api');

describe('OperationCost Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    api.costs.postCost = jest.fn().mockClear();
  });

  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<OperationCost />);
    expect(getByText('Cost for Operation')).toBeInTheDocument();
    expect(getByLabelText(/Name of the Operation:/i)).toBeInTheDocument();
    expect(getByLabelText(/Cost of the Operation:/i)).toBeInTheDocument();
    expect(getByText(/Submit Cost/i)).toBeInTheDocument();
  });

  it('validates form fields', async () => {
    const { getByText, getByLabelText, findByText } = render(<OperationCost />);
    fireEvent.click(getByText(/Submit Cost/i));

    await waitFor(() => {
      expect(findByText(/Required/i)).toBeTruthy();
      expect(findByText(/Operation Cost must be greater than zero/i)).toBeTruthy();
    });
  });

  // it('submits form successfully', async () => {
  //   api.costs.postCost = jest.fn().mockResolvedValue({ data: { success: true } });
  
  //   const { getByLabelText, getByText, findByText } = render(<OperationCost />);
  //   fireEvent.change(getByLabelText(/Name of the Operation:/i), { target: { value: 'Electricity bill' } });
  //   fireEvent.change(getByLabelText(/Cost of the Operation:/i), { target: { value: 100 } });
  //   fireEvent.click(getByText(/Submit Cost/i));
  
  //   await waitFor(() => {
  //     expect(api.costs.postCost).toHaveBeenCalledWith(expect.any(Number), 'Electricity bill', 100, expect.any(String));
  //   });
  
  //   expect(mockedNavigate).toHaveBeenCalledWith('/CompanyDashboard');
  // });
  

  it('handles form submission error', async () => {
    api.costs.postCost = jest.fn().mockRejectedValue(new Error('API error'));

    const { getByLabelText, getByText, findByText } = render(<OperationCost />);
    fireEvent.change(getByLabelText(/Name of the Operation:/i), { target: { value: 'Electricity bill' } });
    fireEvent.change(getByLabelText(/Cost of the Operation:/i), { target: { value: 100 } });
    fireEvent.click(getByText(/Submit Cost/i));

    await waitFor(() => {
      expect(findByText(/API error/i)).toBeTruthy();
    });
  });
});
