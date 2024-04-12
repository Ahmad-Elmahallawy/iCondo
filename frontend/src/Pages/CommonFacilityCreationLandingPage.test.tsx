// CommonFacilityCreationLandingPage.test.tsx

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommonFacilityCreationLandingPage from './CommonFacilityCreationLandingPage';
import { BrowserRouter } from 'react-router-dom';

describe('CommonFacilityCreationLandingPage', () => {
  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <CommonFacilityCreationLandingPage />
      </BrowserRouter>
    );
    expect(document.querySelector('.common-facility-creation-landing-page-container')).toBeInTheDocument();
  });

});
