import React, { Component } from "react";
import SideNav from "../Layout/SideNav";
import Content from "../Layout/Content";
import { connect } from "react-redux";
import {
  fetchData,
  changeLoadingState,
  cleanData,
  savePathName
} from "../store/actions";
import { API_KEY, API_URL } from "../config";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideNav />
        <Content />
      </React.Fragment>
    );
  }

  componentWillMount() {
    // still keeps the data from detail page. Gets rid of that

    this.props.changeLoadingState();
    this.props.cleanData();
    let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.props.fetchData(endpoint);
    this.props.savePathName(this.props.location.pathname);
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    currentPage: state.currentPage,
    totalPages: state.totalPages
  };
};

export default connect(mapStateToProps, {
  fetchData,
  changeLoadingState,
  cleanData,
  savePathName
})(HomePage);
