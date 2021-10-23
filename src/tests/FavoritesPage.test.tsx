import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FavoritePage from '../pages/FavoritesPage';

const initialState = { favoriteList: { value: [] } }
const mockStore = configureStore()
let store

test('FavoritesPage renders', () => {
  store = mockStore(initialState);
  const component = renderer.create(<Provider store={store}><Router><FavoritePage /></Router></Provider>,);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
