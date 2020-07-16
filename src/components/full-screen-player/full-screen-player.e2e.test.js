
import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {FullScreenPlayer} from './full-screen-player';

configure({
  adapter: new Adapter(),
});

const mock = {
  isPlaying: false,
  progress: 0,
  duration: 0,
};

const film = {
  title: `The Grand Budapest Hotel`,
};

it(`Click by Play button calls callback`, () => {
  const {isPlaying, progress, duration} = mock;

  const handlePlayButtonClick = jest.fn();

  const wrapper = shallow(
      <FullScreenPlayer
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        film={film}
        onFullScreenButtonClick={() => {}}
        onFullscreenToggle={() => {}}
        onPlayButtonClick={handlePlayButtonClick}>
        <video />
      </FullScreenPlayer>
  );

  wrapper.find(`.player__play`).simulate(`click`);
  expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);
});