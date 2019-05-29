import React from 'react';
import 'chart.js';
import Statistics from "./components/statistics/Statistics";
import { Route, BrowserRouter as Router } from "react-router-dom";
import MachineLearning from "./components/machine_learning/MachineLearning";



function App() {
  return (
    <Router className="App">
        <Route path='/statistics' component={Statistics} />
        <Route path='/predict' component={MachineLearning} />
    </Router>
  );
}

export default App;
