import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Pagination from '../components/Pagination';

test('Pagination renders', () => {
  const component = renderer.create(<Pagination />,);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
