import React from 'react';
import { render } from '@testing-library/react';
import CreatePropertyLandingPage from './CreatePropertyLandingPage';

describe('CreatePropertyLandingPage', () => {
    it('renders CreateProperty component', () => {
      const { getByTestId } = render(<CreatePropertyLandingPage />);
      const createPropertyComponent = getByTestId('create-property-component');
      expect(createPropertyComponent).toBeTruthy();
    });
  
});