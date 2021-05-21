import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_KEY, API_URL } from "../config";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { genres } from "../pages/Genres";
import { withRouter } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import TrailerModal from "./TrailerModal";
import ProgressProvider from "./ProgressProvider";

class MovieDescription extends Component {
  render() {
    const {
      overview,
      title,
      genres,
      vote_average,
      homepage,
      trailerKey
    } = this.props;

    const pathColor =
      vote_average < 7 ? (vote_average < 4 ? "#ff1717" : "#ffd21c") : "#17ffaa";
    // TODO:
    // https://codesandbox.io/s/react-circular-progressbar-with-initial-animation-0zk372m7l?from-embed
    // https://codesandbox.io/s/goofy-knuth-vkk1o
    return (
      <div class="movie__detail">
        <h3 class="movie__heading">
          {title} <span>(2019)</span>
        </h3>
        <div className="movie__rating">
          <ProgressProvider valueStart={0} valueEnd={vote_average}>
            {value => (
              <CircularProgressbar
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: pathColor,
                  trailColor: "#212422",
                  backgroundColor: "#000"
                })}
                background
                value={value}
                maxValue={10}
                circleRatio
                text={`${vote_average * 10}%`}
              />
            )}
          </ProgressProvider>
        </div>

        <div class="movie__category">
          <ul class="movie__category-list">
            {genres.map(each => {
              return (
                <li class="movie__category-listitem">
                  <a
                    href="#"
                    class="btn btn__category"
                    onClick={e => this.onClick(e, each.name)}
                  >
                    {each.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <h3 class="heading__tertiary">Overview:</h3>
        <p class="movie__overview">{overview}</p>
        <div class="movie__action">
          <ul class="movie__action-list">
            <li class="movie__action-listitem">
              <a href={`${homepage}`} target="_blank" class="btn btn__action">
                Website
                <svg>
                  <use xlinkHref="./images/sprite.svg#icon-link"></use>
                </svg>
              </a>
            </li>
            <li class="movie__action-listitem">
              <TrailerModal
                showTrailer={this.props.showTrailer}
                trailerKey={trailerKey}
              />

              <a
                // href={`https://www.youtube.com/watch?v=${trailerKey}`}
                // target="_blank"
                class="btn btn__action"
                onClick={this.showTrailer}
                // TODO:
                // pass trailer key
              >
                Trailer
                <svg>
                  <use xlinkHref="./images/sprite.svg#icon-controller-play"></use>
                </svg>
              </a>
            </li>
            <li class="movie__action-listitem">
              <a href="#" class="btn btn__action">
                IDMB
                <svg>
                  <use xlinkHref="./images/sprite.svg#icon-imdb"></use>
                </svg>
              </a>
            </li>
            <li class="movie__action-listitem">
              <Link to="/" class="btn btn__action">
                Back
                <svg>
                  <use xlinkHref="./images/sprite.svg#icon-arrow-back"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  onClick = (e, key) => {
    e.preventDefault();
    let endpoint;
    genres.forEach(function(each) {
      if (each.name === key) {
        endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${each.id}`;
        return;
      }
    });
    this.props.cleanData();
    this.props.fetchData(endpoint);
    this.props.history.push(`/category/${key}`);
  };

  showTrailer = e => {
    e.preventDefault();
    this.props.showTrailerModal();
  };
}

const mapStateToProps = state => {
  return {
    showTrailer: state.showTrailer
  };
};

export default withRouter(connect(mapStateToProps, actions)(MovieDescription));
