import React from 'react';
import { render } from '@testing-library/react';
import NavigationBar from './NavigationBar';

test('Check if Cek-in exist in navbar', () => {
  const { getByText } = render(<NavigationBar />);
  expect(getByText('Cek-in')).toBeInTheDocument();
});
