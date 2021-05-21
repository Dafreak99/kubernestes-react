import React, { Component } from "react";
import SideNav from "../Layout/SideNav";
import Content from "../Layout/Content";
import { connect } from "react-redux";
import {
  changeSideNavState,
  loadMore,
  changeLoadingState,
  fetchData,
  savePathName
} from "../store/actions";
import { API_KEY, API_URL } from "../config";

class TrendingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideNav />
        <Content />
      </React.Fragment>
    );
  }

  componentWillMount() {
    this.props.changeLoadingState();
    let endpoint = `${API_URL}trending/all/day?api_key=${API_KEY}&language=en-US&page=1`;
    this.props.fetchData(endpoint);
    this.props.savePathName(this.props.location.pathname);
  }
}

export default connect(
  null,
  { changeSideNavState, loadMore, changeLoadingState, fetchData, savePathName }
)(TrendingPage);
