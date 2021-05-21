import React, { Component } from "react";

export default class MovieInfo extends Component {
  render() {
    const { release_date, revenue } = this.props;

    return (
      <div class="movie__info">
        <ul class="movie__info-list">
          <li class="movie__info-listitem">
            Webpage: <span>Link</span>
          </li>
          <li class="movie__info-listitem">
            Release Date: <span>{release_date}</span>
          </li>
          <li class="movie__info-listitem">
            Revenue: <span>{revenue}$</span>
          </li>
        </ul>
      </div>
    );
  }
}
