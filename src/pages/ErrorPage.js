import React, { Component } from "react";
import SideNav from "../Layout/SideNav";
import { Link } from "react-router-dom";
export default class ErrorPage extends Component {
  render() {
    return (
      <React.Fragment>
        <SideNav></SideNav>
        <main className="content">
          <div className="error">
            <div className="error__image-wrapper">
              <img
                className="error__image"
                src="/images/undraw_server_down_s4lk.svg"
                alt=""
              />
              <img class="error__grey-layer" src="/images/Union.svg"></img>
            </div>

            <p className="error__paragraph">
              Sorry this link is not available, please go back
            </p>
            <Link to="/" class="btn btn-error">
              Back
              <svg>
                <use xlinkHref="./images/sprite.svg#icon-arrow-back"></use>
              </svg>
            </Link>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
