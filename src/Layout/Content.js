import React, { Component } from "react";
import MovieThumbnailList from "../Components/MovieThumbnailList";
import MovieDetail from "../Components/MovieDetail";
import Spinner from "../Components/Spinner";
import Search from "../Components/Search";
import { connect } from "react-redux";
import {
  changeSideNavState,
  loadMore,
  changeLoadingState
} from "../store/actions";
import { API_KEY, API_URL } from "../config";

class Content extends Component {
  render() {
    const {
      loading,
      movies,
      searchTerm,
      isDetail,
      movieDetail,
      casts,
      showSideNav,
      changeSideNavState,
      trailerKey,
      recommendations,
      loadMore,
      search,
      pathName
    } = this.props;

    return (
      <main className="content">
        {loading ? <Spinner /> : false}
        <Search search={search} />
        <input
          type="checkbox"
          className="side-nav__checkbox"
          name="sidenav__checkbox"
          id="checkbox"
        />
        <label
          className="side-nav__toggle"
          for="checkbox"
          onClick={changeSideNavState}
        >
          <span className="line"></span>
        </label>
        {/* Movie Detail */}
        {isDetail && searchTerm === "" ? (
          <MovieDetail {...movieDetail} casts={casts} trailerKey={trailerKey} />
        ) : (
          false
        )}

        <div className="below">
          <h3 className="heading__secondary margin-bottom-medium">
            {this.getTitleOfThePage()}
          </h3>
          <MovieThumbnailList movies={movies} />
          {/* if it's a detail page hide load more in recommendations */}
          {isDetail ? (
            false
          ) : (
            <a href="#" className="btn btn__loadMoreBtn" onClick={this.onClick}>
              Load More
            </a>
          )}
        </div>
      </main>
    );
  }

  getTitleOfThePage = () => {
    const { pathName } = this.props;
    if (pathName === "/") {
      return "Popular Movies";
    } else if (pathName.includes("/detail")) {
      return "Recommendations";
    } else if (pathName === "/trending") {
      return "Trending Movies";
    } else {
      return "Default";
    }
  };
  onClick = e => {
    const { currentPage, loadMore, changeLoadingState } = this.props;
    e.preventDefault();
    let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage +
      1}`;
    changeLoadingState();
    loadMore(endpoint);
  };
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    loading: state.loading,
    isDetail: state.isDetail,
    movieDetail: state.movieDetail,
    trailerKey: state.trailerKey,
    searchTerm: state.searchTerm,
    pathName: state.pathName
  };
};

export default connect(mapStateToProps, {
  changeSideNavState,
  loadMore,
  changeLoadingState
})(Content);
