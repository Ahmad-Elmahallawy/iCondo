import { render, screen } from '@testing-library/react';
import CommonFacility from './CommonFacility';
import { BrowserRouter } from 'react-router-dom';

describe('CommonFacility', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <CommonFacility />
      </BrowserRouter>
    );
  });
});
