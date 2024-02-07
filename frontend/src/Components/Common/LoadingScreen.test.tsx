// LoadingScreen.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the Jest DOM library extension
import LoadingScreen from './LoadingScreen';

describe('LoadingScreen component', () => {
  it('renders loading spinner', () => {
    render(<LoadingScreen />);

    // Assert that the loading spinner is rendered
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
});
