import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Header from '../components/Header';

test('Header renders', () => {
  const component = renderer.create(<Router><Header></Header></Router>,);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
