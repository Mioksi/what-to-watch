import React from 'react';
import renderer from 'react-test-renderer';

import MoviePage from './movie-page.jsx';
import {MOVIES} from '../../common/consts';

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 8.9,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`
};

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      film={film}
      movies={MOVIES}
      onCardClick={() => {}}
      onCardTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
