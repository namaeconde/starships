import React from 'react';
import { render, cleanup } from '@testing-library/react'
import StarshipCard, { FavoriteStarshipCard } from '../components/StarshipCard';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

let starship = {
  name: "CR90 corvette",
  manufacturer: "Corellian Engineering Corporation",
  hyperdrive_rating: 2.0,
  passengers: "600",
  notes: "I love the design on this one! 🚀"
}
const initialState = { favoriteList: { value: [ starship ] } }
const mockStore = configureStore()
let store

afterEach(cleanup);

test('StarshipCard renders', () => {
  store = mockStore(initialState);
  const { asFragment } = render(<Provider store={store}><StarshipCard starship={starship}/></Provider>);
  expect(asFragment()).toMatchSnapshot();
});

test('FavoriteStarshipCard renders', () => {
  store = mockStore(initialState);
  const { asFragment } = render(<Provider store={store}><FavoriteStarshipCard starship={starship}/></Provider>);
  expect(asFragment()).toMatchSnapshot();
});

