import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../reducer/state/state';
import {getPromoFilm} from '../../reducer/films/selectors';
import {getShownMovies, getFilmsByGenre, getPlayerState} from '../../reducer/state/selectors';

import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMore from '../show-more/show-more.jsx';
import Header from '../header/header.jsx';
import FullScreenPlayer from '../full-screen-player/full-screen-player.jsx';
import Footer from '../footer/footer.jsx';
import withActiveCard from '../../hocs/with-active-card/with-active-card';
import withFullScreenPlayer from '../../hocs/with-full-screen-player/with-full-screen-player';

import {AppRoute} from '../../common/consts';

const FullScreenPlayerWrapped = withFullScreenPlayer(FullScreenPlayer);
const MoviesListWrapped = withActiveCard(MoviesList);

const Main = ({
  film: {
    id,
    name,
    genre,
    released,
    [`background_image`]: backgroundPoster,
    [`poster_image`]: filmPoster
  },
  films,
  shownMoviesCount,
  onShowMoreButtonClick,
  isPlayerActive}) => {

  const isShowMoreButtonHide = shownMoviesCount < films.length;

  return (
    isPlayerActive ? (
      <FullScreenPlayerWrapped />
    ) : (
      <>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={backgroundPoster} alt={name}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header />
          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={filmPoster} alt={name} width="218" height="327"/>
              </div>
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{released}</span>
                </p>
                <div className="movie-card__buttons">
                  <Link to={`${AppRoute.PLAYER}/${id}`} className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>
            <GenresList/>
            <MoviesListWrapped />
            {isShowMoreButtonHide && <ShowMore
              onShowMoreButtonClick={onShowMoreButtonClick}
            />}
          </section>
          <Footer />
        </div>
      </>
    )
  );
};

Main.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    [`background_image`]: PropTypes.string.isRequired,
    [`poster_image`]: PropTypes.string.isRequired,
  }).isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        [`preview_image`]: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  isPlayerActive: PropTypes.bool.isRequired,
  onFullscreenToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  film: getPromoFilm(state),
  films: getFilmsByGenre(state),
  shownMoviesCount: getShownMovies(state),
  isPlayerActive: getPlayerState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowMoreButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
