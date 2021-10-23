import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FavoritePage from '../pages/FavoritesPage';

const initialState = { favoriteList: { value: [] } }
const mockStore = configureStore()
let store

afterEach(cleanup);

test('FavoritesPage renders', () => {
  store = mockStore(initialState);
  const { asFragment } = render(<Provider store={store}><Router><FavoritePage /></Router></Provider>,);
  expect(asFragment()).toMatchSnapshot();
});
