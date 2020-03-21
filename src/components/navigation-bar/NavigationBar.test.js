import React from 'react';
import { render } from '@testing-library/react';
import NavigationBar from './NavigationBar';

test('renders learn react link', () => {
  const { getByText } = render(<NavigationBar />);
  // const linkElement = getByText('Warehouse');
  // expect(linkElement).toBeInTheDocument();
});
 