import React, { Component } from "react";
import SideNav from "../Layout/SideNav";
import Spinner from "../Components/Spinner";
import Search from "../Components/Search";
import MovieThumbnailList from "../Components/MovieThumbnailList";
import { connect } from "react-redux";
import { API_KEY, API_URL } from "../config";
import {
  search,
  cleanData,
  changeLoadingState,
  loadMore,
  savePathName
} from "../store/actions";

class SearchPage extends Component {
  render() {
    const {
      loading,
      movies,
      changeSideNavState,
      loadMore,
      currentPage,
      totalPages
    } = this.props;
    const { key } = this.props.match.params;

    return (
      <React.Fragment>
        <SideNav showSideNav={this.props.showSideNav} />
        <main className="content">
          {loading ? <Spinner /> : false}
          <Search />
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

          <div className="below">
            <h3 className="heading__secondary ">Search result for {key}</h3>
            <p
              className="heading__tertiary margin-bottom-medium"
              style={{ fontStyle: "italic" }}
            >
              Found {this.props.totalResults} movies
            </p>
            <MovieThumbnailList movies={movies} />
            {/* if not the last page */}
            {currentPage < totalPages ? (
              <a
                href="#"
                className="btn btn__loadMoreBtn"
                onClick={this.onClick}
              >
                Load More
              </a>
            ) : (
              false
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }

  componentWillMount() {
    const { key } = this.props.match.params;
    console.log(key);
    let endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${key}`;
    console.log(endpoint);

    this.props.cleanData();
    this.props.search(endpoint);
    this.props.savePathName(this.props.location.pathname);
  }

  onClick = e => {
    const { key } = this.props.match.params;

    e.preventDefault();
    let endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${key}&page=${this
      .props.currentPage + 1}`;
    console.log(endpoint);
    this.props.loadMore(endpoint);
  };
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    loading: state.loading,
    totalResults: state.totalResults
  };
};

export default connect(
  mapStateToProps,
  { search, cleanData, changeLoadingState, loadMore, savePathName }
)(SearchPage);
