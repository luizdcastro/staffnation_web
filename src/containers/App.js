import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import VeticalHeader from '../components/VerticalHeader'
import HomePage from '../pages/HomePage'
import JobsPage from '../pages/JobsPage'
import LoginPage from '../pages/LoginPage'
import BusinessPage from '../pages/BusinessPage'

import { logoutUser } from "../redux/actions/AuthActions";


const App = ({ user, dispatchLogout }) => {

  return (
    <React.Fragment>
      {user.isLoggedIn ?
        <VeticalHeader
          onLogout={dispatchLogout}
        />
        : null
      }
      <div className="App">
        {!user.isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Redirect to="/" />
          </Switch>
        ) : (

            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/jobs" component={JobsPage} />
              <Route exact path="/business" component={BusinessPage} />
              <Redirect to="/" />
            </Switch>
          )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
  dispatchLogout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

