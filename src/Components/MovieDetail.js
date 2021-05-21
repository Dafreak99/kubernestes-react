import React, { Component } from "react";
import MoviePoster from "./MoviePoster";
import MovieCast from "./MovieCast";
import MovieInfo from "./MovieInfo";
import MovieDescription from "./MovieDescription";
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from "../config";

// ${IMAGE_BASE_URL + POSTER_SIZE + poster_path}
export default class MovieDetail extends Component {
  render() {
    const {
      overview,
      title,
      revenue,
      release_date,
      genres,
      poster_path,
      vote_average,
      casts,
      homepage,
      trailerKey
    } = this.props;

    return (
      <div
        class="above"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL +
            BACKDROP_SIZE +
            poster_path})`
        }}
      >
        <MoviePoster poster_path={poster_path} />
        <MovieDescription
          overview={overview}
          title={title}
          genres={genres}
          release_date={release_date}
          vote_average={vote_average}
          homepage={homepage}
          trailerKey={trailerKey}
        />
        <h3 class="heading__tertiary margin-bottom-medium margin-top-medium">
          Cast:
        </h3>
        <MovieCast casts={casts} />
        <h3 class="heading__tertiary margin-bottom-medium margin-top-medium">
          Information:
        </h3>
        <MovieInfo release_date={release_date} revenue={revenue} />
      </div>
    );
  }
}
