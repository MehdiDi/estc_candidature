import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import 'chart.js';
import Statistics from "./components/statistics/Statistics";
import MachineLearnings from './components/MachineLearnings/MachineLearnings';
import Login from './views/Login/Login';
import Logout from './views/Login/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import NavBar from "./components/layout/NavBar"


class App extends Component {
  componentDidMount() {
    this.props.onTry();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
    );
    if (this.props.auth) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/machinelearnings" component={MachineLearnings} />
          <Redirect to="/statistics" />
        </Switch>
      );
    }
    return (
      <div className="App">
        {/*<Container>*/}
        {routes}
        {/*</Container>*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTry: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);