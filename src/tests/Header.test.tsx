import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react'
import Header from '../components/Header';

afterEach(cleanup);

test('Header renders', () => {
  const { asFragment }= render(<Router><Header></Header></Router>,);
  expect(asFragment()).toMatchSnapshot();
});
