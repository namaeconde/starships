import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import HomePage from '../pages/HomePage';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const initialState = { favoriteList: { value: [] } }
const mockStore = configureStore()
let store

test('Header renders', () => {
  store = mockStore(initialState);
  const component = renderer.create(<Provider store={store}><Router><HomePage /></Router></Provider>,);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
