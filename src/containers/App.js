import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import VerticalDrawer from '../components/VerticalDrawer'
import HomePage from '../pages/HomePage'
import CreateJobPage from '../pages/CreateJobPage'
import ListJobsPage from '../pages/ListJobsPage'
import LoginPage from '../pages/LoginPage'
import BusinessPage from '../pages/BusinessPage'
import EditStorePage from '../pages/EditStorePage'
import EditJobPage from '../pages/EditJobPage'
import JobDetailsPage from '../pages/JobDetailsPage'
import SearchStaffPage from '../pages/SeachStaffPage'
import SettingsPage from '../pages/SettingsPage'
import FinancePage from '../pages/FinancePage'

import { logoutUser } from "../redux/actions/AuthActions";

const App = ({ user, dispatchLogout }) => {

  return (
    <React.Fragment>
      {user.isLoggedIn ?
        <VerticalDrawer
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
              <Route exact path="/" component={HomePage} onLogout={dispatchLogout}
              />s
              <Route exact path="/create-job" component={CreateJobPage} />
              <Route exact path="/list-jobs" component={ListJobsPage} />
              <Route exact path="/business" component={BusinessPage} />
              <Route exact path="/edit-store/:storeId" component={EditStorePage} />
              <Route exact path="/edit-job/:jobId" component={EditJobPage} />
              <Route exact path="/job/:jobId" component={JobDetailsPage} />
              <Route exact path="/search-staff" component={SearchStaffPage} />
              <Route exact path="/finance" component={FinancePage} />
              <Route exact path="/settings" component={SettingsPage} />
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

