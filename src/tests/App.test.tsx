import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const initialState = { favoriteList: { value: [] } }
const mockStore = configureStore()
let store

test('App renders', () => {
  store = mockStore(initialState);
  const component = renderer.create(<Provider store={store}><App /></Provider>,);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
