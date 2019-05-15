import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import 'chart.js';
import Statistics from "./components/statistics/Statistics";
import Login from './views/Login/Login';
import Logout from './views/Login/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'


class App extends Component {
  componentDidMount() {
    this.props.onTry();
  }
  render() {
    return (
      <div className="App">
        {/*<Container>*/}
        {console.log(this.props.auth)}
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          {this.props.auth ? <Route path="/statistics" component={Statistics} /> : <Redirect to="/" />}
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

/*
    let routes = (
      <Switch>
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" exact component={Logout} />
          <Route path="/statistics" component={Statistics} />
        </Switch>
      );
    }
*/