import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

class TrailerModal extends Component {
  render() {
    const { showTrailer, trailerKey } = this.props;

    return (
      <div
        class={showTrailer ? "trailer-wrapper active" : "trailer-wrapper"}
        onClick={e => {
          console.log(e.target);
          if (e.target.className === "trailer-wrapper active") {
            this.props.showTrailerModal();
          }
        }}
      >
        <div className="trailer">
          <iframe src={`https://www.youtube.com/embed/${trailerKey}`}></iframe>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(TrailerModal);
