import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import 'chart.js';
import Statistics from "./components/statistics/Statistics";
<<<<<<< HEAD
import MachineLearnings from './components/MachineLearnings/MachineLearnings';
=======
import MachineLearning from "./components/machine_learning/MachineLearning.js";

>>>>>>> master
import Login from './views/Login/Login';
import Logout from './views/Login/Logout/Logout';
import { connect } from 'react-redux';
<<<<<<< HEAD
import * as actions from './store/actions/index'
import NavBar from "./components/layout/NavBar"


=======
>>>>>>> master
class App extends Component {
  componentDidMount() {
    this.props.onTry();
  }
  render() {
<<<<<<< HEAD
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
=======
    return (
      <div className="App">  {console.log(this.props.auth)}
        <Switch>
          <Route path="/" exact component={Login} />
          {this.props.auth ? <Route path="/statistics" exact component={Statistics} /> : <Redirect to="/" />}
          {this.props.auth ? <Route path='/predict' exact component={MachineLearning} /> : <Redirect to="/" />}
        </Switch>
    </div>
>>>>>>> master
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.token !== null
  };
};
<<<<<<< HEAD

const mapDispatchToProps = dispatch => {
  return {
    onTry: () => dispatch(actions.authCheckState())
  };
};
=======
>>>>>>> master

export default connect(mapStateToProps, mapDispatchToProps)(App);