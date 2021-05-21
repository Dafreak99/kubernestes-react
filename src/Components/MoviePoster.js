import React, { Component } from "react";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

export default class MoviePoster extends Component {
  render() {
    const { poster_path } = this.props;
    return (
      <div class="movie__poster">
        <img src={IMAGE_BASE_URL + POSTER_SIZE + poster_path} alt="poster" />
      </div>
    );
  }
}
