import React, { Component } from "react";
import SideNav from "../Layout/SideNav";
import Content from "../Layout/Content";
import { API_KEY, API_URL } from "../config";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as actions from "../store/actions";

import {
  loadDetailPage,
  cleanData,
  changeLoadingState,
  savePathName
} from "../store/actions";
class DetailPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideNav />
        <Content />
      </React.Fragment>
    );
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.fetchMovieDetail();
  }

  fetchMovieDetail() {
    const { id } = this.props.match.params;
    const { changeLoadingState, loadDetailPage, savePathName } = this.props;
    let movieDetail = `${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`;
    let credits = `${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
    let video = `${API_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    let recommendations = `${API_URL}movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`;

    //  make loading state true so the spinner will appear
    changeLoadingState();
    savePathName(this.props.location.pathname);
    // in loadData function after finish execution loadDate will be set to false to stop
    axios
      .all([
        axios.get(movieDetail),
        axios.get(credits),
        axios.get(video),
        axios.get(recommendations)
      ])
      .then(
        axios.spread((movieDetail, credits, videos, recommendations) => {
          loadDetailPage(
            movieDetail.data,
            credits.data.cast,
            videos.data.results[0].key,
            true,
            recommendations.data.results.slice(0, 8)
          );
        })
      );
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    if (prevProps.match.params.id !== id) {
      this.fetchMovieDetail();
    }
  }

  componentWillUnmount() {
    this.props.clearDetail();
  }
}

export default connect(null, actions)(withRouter(DetailPage));
