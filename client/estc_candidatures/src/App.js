import React from 'react';
import { Grid, Image } from "semantic-ui-react";
import 'chart.js';
import Statistics from "./components/statistics/Statistics";
import NavBar from "./components/layout/NavBar"

import Login from './views/Login/Login';

function App() {
  const leftItems = [
    { as: "a", content: "Home", key: "home" },
    { as: "a", content: "Users", key: "users" },
    { as: "a", content: "Users", key: "users" },
    { as: "a", content: "Users", key: "users" },
    { as: "a", content: "Users", key: "users" }
  ];
  const rightItems = [
    { as: "a", content: "Login", key: "login" },
    { as: "a", content: "Register", key: "register" }
  ];
  return (

    <div className="App"  style ={{backgroundColor:"#E9F3F9"}}>
      {/*<Container>*/}
      <NavBar leftItems={leftItems} rightItems={rightItems}  >
        <Statistics  />  
      </NavBar>
     </div>
  );
}

export default App;
