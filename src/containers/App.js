import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import VeticalHeader from '../components/VerticalHeader'
import HomePage from '../pages/HomePage'
import CreateJobPage from '../pages/CreateJobPage'
import ListJobsPage from '../pages/ListJobsPage'
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
              <Route exact path="/create-job" component={CreateJobPage} />
              <Route exact path="/list-jobs" component={ListJobsPage} />
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

