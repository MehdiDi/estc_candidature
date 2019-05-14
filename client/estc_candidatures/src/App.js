import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'chart.js';
import Statistics from "./components/statistics/Statistics";
import Login from './views/Login/Login';
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Container>*/}
        {console.log(this.props.auth)}
        <Switch>
          {this.props.auth ? < Route path="/statistics" component={Statistics} /> : null}
        </Switch>
        <Route path="/" component={Login} exact />
        {/*</Container>*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.token !== null
  };
}

export default connect(mapStateToProps, null)(App);