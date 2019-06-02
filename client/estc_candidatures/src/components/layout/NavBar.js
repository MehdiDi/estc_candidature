import _ from "lodash";
import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom';
import { Menu, Segment } from "semantic-ui-react";
import Classes from './NavBar.module.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Statistics'
    }
  }

  componentDidMount() {
    if (this.props.history.location.pathname === '/machinelearnings')
      this.setState({ activeItem: 'Machine Learning' })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === "Statistics")
      this.props.history.push('statistics');
    else if (name === "Machine Learning")
      this.props.history.push('machinelearnings');
    else
      this.props.history.push('logout');
  }
  render() {
    const { activeItem } = this.state
    const segmentStyle = {
      backgroundColor: '#00b5ad'
    }
    return (
      <div className={Classes.NavBar} >
        <Segment inverted style={{backgroundColor: "#008080",}}>
          <Menu size='small' pointing secondary inverted style={{ segmentStyle ,borderWidth: 0}}  >
            <Menu.Item name='Statistics' active={activeItem === 'Statistics'} onClick={this.handleItemClick} style={{fontSize: 16}}/>
            <Menu.Item
              name='Machine Learning'
              active={activeItem === 'Machine Learning'}
              onClick={this.handleItemClick} style={{fontSize: 16}}
            />
            <Menu.Menu position='right'>
              <Menu.Item name='Logout' onClick={this.handleItemClick} style={{fontSize: 16}}/>
            </Menu.Menu>
          </Menu>
        </Segment>
      </div>
    );
  }
}

export default withRouter(NavBar);
