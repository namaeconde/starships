import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react'
import HomePage from '../pages/HomePage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const initialState = { favoriteList: { value: [] } }
const mockStore = configureStore()
let store

afterEach(cleanup);

test('HomePage renders', () => {
  store = mockStore(initialState);
  const { asFragment } = render(<Provider store={store}><Router><HomePage /></Router></Provider>,);
  expect(asFragment()).toMatchSnapshot();
});
