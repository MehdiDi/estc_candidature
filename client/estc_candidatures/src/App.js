import React from 'react';
import { Grid } from "semantic-ui-react";
import 'chart.js';
import Statistics from "./components/statistics/Statistics";
import Login from './views/Login/Login';


function App() {
  return (
    <div className="App">
      {/*<Container>*/}
      <Login />
      {/*</Container>*/}
    </div>
  );
}

export default App;
