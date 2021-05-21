import React, { Component } from "react";
import SideNav from "../Layout/SideNav";
import Content from "../Layout/Content";
import { connect } from "react-redux";
import { fetchData, cleanData, savePathName } from "../store/actions";

class CategoryPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideNav />
        <Content />
      </React.Fragment>
    );
  }

  componentWillMount() {
    console.log(this.props.location.pathname);
    this.props.savePathName(this.props.location.pathname);
  }
}
export default connect(
  null,
  { fetchData, cleanData, savePathName }
)(CategoryPage);
