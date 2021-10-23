import React from 'react';
import { render, cleanup } from '@testing-library/react'
import App from '../App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const initialState = { favoriteList: { value: [] } }
const mockStore = configureStore()
let store

afterEach(cleanup);

test('App renders', () => {
  store = mockStore(initialState);
  const { asFragment }= render(<Provider store={store}><App /></Provider>,);
  expect(asFragment()).toMatchSnapshot();
});
