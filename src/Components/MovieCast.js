import React, { Component } from "react";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { connect } from "react-redux";
class MovieCast extends Component {
  render() {
    const { casts } = this.props;
    return (
      <div class="movie__cast">
        {casts
          ? casts.slice(0, 8).map(cast => {
              return (
                <div class="movie__cast-circle movie__cast-circle--3">
                  <img
                    src={IMAGE_BASE_URL + POSTER_SIZE + cast.profile_path}
                    alt="case2"
                    class="movie__cast-circle-avatar"
                  />
                  <div class="movie__cast-popup-profile">
                    <p class="movie__cast-popup-profile-playname">
                      {cast.character}
                    </p>
                    <p class="movie__cast-popup-profile-realname">
                      {cast.name}
                    </p>
                  </div>
                </div>
              );
            })
          : false}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    casts: state.casts
  };
};

export default connect(
  mapStateToProps,
  null
)(MovieCast);
