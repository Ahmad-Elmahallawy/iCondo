import { render } from '@testing-library/react';
import IconCard from './IconCard';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

test('renders icon card with correct title, icon, and route', () => {
  const title = 'Test Title';
  const icon = '/test-icon.png';
  const route = '/test-route';
  
  const { getByText, getByAltText } = render(
    <BrowserRouter>
      <IconCard title={title} icon={icon} route={route} />
    </BrowserRouter>
  );
  
  const titleElement = getByText(title);
  expect(titleElement).toBeInTheDocument();
  
  const iconElement = getByAltText('Icon');
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveAttribute('src', icon);
  
  const linkElement = getByText(title).closest('a');
  expect(linkElement).toHaveAttribute('href', route);
});
