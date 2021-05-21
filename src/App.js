import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import ErrorPage from "./pages/ErrorPage";
import TrendingPage from "./pages/TrendingPage";
import CategoryPage from "./pages/CategoryPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <HomePage {...props} />}
            ></Route>
            <Route
              path="/detail=:id"
              exact
              // pass props to use match, history, location without using withRouter()
              render={props => <DetailPage {...props} />}
            ></Route>
            <Route
              path="/search/:key"
              exact
              render={props => <SearchPage {...props} />}
            ></Route>
            <Route
              path="/trending"
              render={props => <TrendingPage {...props} />}
            ></Route>
            <Route
              path="/category/:key"
              exact
              render={props => <CategoryPage {...props} />}
            ></Route>
            {/* TO render all matching page we have to have Switch */}
            <Route path="*" component={ErrorPage}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
