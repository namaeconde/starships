import React from 'react';
import { render, cleanup } from '@testing-library/react'
import Pagination from '../components/Pagination';

afterEach(cleanup);

test('Pagination renders', () => {
  const { asFragment } = render(<Pagination />,);
  expect(asFragment()).toMatchSnapshot();
});
