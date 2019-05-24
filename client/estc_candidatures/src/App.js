import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'chart.js';
import Statistics from "./components/statistics/Statistics";
import MachineLearning from "./components/Machine Learning/MachineLearning.js";

import Login from './views/Login/Login';
import { connect } from 'react-redux';
class App extends Component {
  render() {
    return (
      <div> 
             <MachineLearning />
      </div>
      /*<div className="App">  {console.log(this.props.auth)}
        <Switch>
          <Route path="/" exact component={Login} />
          {this.props.auth ? <Route path="/statistics" exact component={Statistics} /> : <Redirect to="/" />}
        </Switch>
    </div>*/
    );
  }

}

const mapStateToProps = state => {
  return {
    auth: state.token !== null
  };
}

export default connect(mapStateToProps, null)(App);