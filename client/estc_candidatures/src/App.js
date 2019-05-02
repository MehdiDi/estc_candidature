import React from 'react';
import { Grid } from "semantic-ui-react";
import 'chart.js';
import Statistics from "./components/statistics/Statistics";


function App() {
  return (
    <div className="App">
        {/*<Container>*/}
            <Statistics />
        {/*</Container>*/}
    </div>
  );
}

export default App;
