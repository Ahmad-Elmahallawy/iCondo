import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Import the component to be tested
import EmployeeRegistrationLandingPage from './EmployeeRegistrationLandingPage';


jest.mock('../Components/Authentication/EmployeeRegistration', () => () => <div>Mocked EmployeeRegistration Component</div>);

describe('EmployeeRegistrationLandingPage Component', () => {
  test('renders EmployeeRegistration component', () => {

    const { getByText } = render(<EmployeeRegistrationLandingPage />);


    const registrationComponent = getByText('Mocked EmployeeRegistration Component');

    expect(registrationComponent).toBeInTheDocument();
  });

});
