import React, { Component } from "react";
import { withRouter } from "react-router";
import { API_KEY, API_URL } from "../config";
import { search, cleanData } from "../store/actions";
import { connect } from "react-redux";

class Search extends Component {
  state = {
    query: null
  };
  render() {
    return (
      <div className="search">
        <form className="search__form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="search__input"
            id="search-input"
            onChange={this.onChange}
            // value didn't stay when refresh the page
          />
          <label for="search-input" className="search__label">
            <svg className="search__icon">
              <use xlinkHref="/images/sprite.svg#icon-search"></use>
            </svg>
          </label>
        </form>
      </div>
    );
  }

  onChange = e => {
    this.setState({ query: e.target.value });
  };

  onSubmit = e => {
    const { query } = this.state;

    e.preventDefault();
    let endpoint;
    if (query === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
    }
    this.props.cleanData();
    this.props.search(endpoint);
    this.props.history.push(`/search/${query}`);

    // SearchPage only mount for one time
    // If we search in /search/ -> component already mounted -> the data will not be updated
  };
}

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    { search, cleanData }
  )(Search)
);
