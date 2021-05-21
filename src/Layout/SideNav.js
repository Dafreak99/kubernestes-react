import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { API_KEY, API_URL } from "../config";
import { genres } from "../pages/Genres";
import { fetchData, savePathName, changeLoadingState } from "../store/actions";
import { withRouter } from "react-router-dom";
class SideNav extends Component {
  render() {
    const { showSideNav } = this.props;
    return (
      <nav className={showSideNav ? "side-nav appear" : "side-nav"}>
        <div className="side-nav__trendy">
          <div className="side-nav__logo">
            <Link to="/">
              <img src="/images/undraw_horror_movie_3988 (1).svg" alt="logo" />
            </Link>
          </div>

          <ul className="side-nav__list">
            <li className="side-nav__list-item">
              <Link to="/">
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-star"></use>
                </svg>
                Popular Movies
              </Link>
            </li>
            <li className="side-nav__list-item">
              <Link to="/trending">
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-tv"></use>
                </svg>
                Trending
              </Link>
            </li>
          </ul>
        </div>

        <div className="side-nav__category">
          <ul className="side-nav__list">
            <li className="side-nav__list-item">
              <Link
                to="/category/Action"
                onClick={e => this.onClick(e, "Action")}
              >
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-folder-video"></use>
                </svg>
                Action
              </Link>
            </li>
            <li className="side-nav__list-item">
              <Link
                to="/category/Horror"
                onClick={e => this.onClick(e, "Horror")}
              >
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-folder-video"></use>
                </svg>
                Horror
              </Link>
            </li>
            <li className="side-nav__list-item">
              <Link
                to="/category/Romance"
                onClick={e => this.onClick(e, "Romance")}
              >
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-folder-video"></use>
                </svg>
                Romance
              </Link>
            </li>
            <li className="side-nav__list-item">
              <Link
                to="/category/Science Fiction"
                onClick={e => this.onClick(e, "Science Fiction")}
              >
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-folder-video"></use>
                </svg>
                Sci-Fi
              </Link>
            </li>
            <li className="side-nav__list-item">
              <Link
                to="/category/Thriller"
                onClick={e => this.onClick(e, "Thriller")}
              >
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-folder-video"></use>
                </svg>
                Thriller
              </Link>
            </li>
            <li className="side-nav__list-item">
              <Link
                to="/category/Adventure"
                onClick={e => this.onClick(e, "Adventure")}
              >
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-folder-video"></use>
                </svg>
                Adventure
              </Link>
            </li>
          </ul>
        </div>
        <div className="side-nav__copy-right">
          <p>Provided By</p>
          <img
            src="/images/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
            alt="copyright-logo"
          />
        </div>
      </nav>
    );
  }

  onClick = (e, key) => {
    e.preventDefault();
    this.props.changeLoadingState();
    let endpoint;
    genres.forEach(function(each) {
      if (each.name === key) {
        endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${each.id}`;
        return;
      }
    });
    this.props.fetchData(endpoint);
    this.props.history.push(`/category/${key}`);
  };
}

const mapStateToProps = state => {
  return {
    showSideNav: state.showSideNav
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchData, savePathName, changeLoadingState }
  )(SideNav)
);
