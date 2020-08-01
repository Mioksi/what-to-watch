import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import history from '../../history';

import Footer from './footer.jsx';

it(`Should Footer render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Footer
            onReplayButtonClick={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
