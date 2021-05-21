import React, { Component } from "react";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";

class MovieThumbnailList extends Component {
  render() {
    const { movies } = this.props;

    return (
      <div className="movie__thumbnail-list">
        {movies.map((movie, i) => {
          return (
            <div className="movie__thumbnail-listitem" key={i}>
              <Link
                to={`/detail=${movie.id}`}
                className="movie__thumbnail-image"
                onClick={this.onReload}
              >
                {/* if the movie doesn't have a poster */}
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_URL}w200/${movie.poster_path}`}
                    alt="poster"
                  />
                ) : (
                  <img src="/images/notfound.jpg" alt="poster" />
                )}
                <div className="overlay">
                  <p className="movie__thumbnail-paragraph margin-bottom-small">
                    {movie.overview}
                  </p>
                  {/* <Link to={"/detail=" + movie.id} className="readMoreBtn">
                      Read More
                    </Link> */}
                  <Link
                    to={"/detail=" + movie.id}
                    className="readMoreBtn"
                    onClick={this.onReload}
                  >
                    Read More
                  </Link>
                </div>
              </Link>
              <div className="movie__thumbnail-title">
                <p>{movie.title}</p>
              </div>
            </div>
          );
        })}
      </div>
      // MOVIE THUMNAILIST
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

export default connect(mapStateToProps, actions)(MovieThumbnailList);
