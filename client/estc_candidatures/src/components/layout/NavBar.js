import _ from "lodash";
import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import Classes from './NavBar.module.css';

class NavBar extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    const segmentStyle = {
      backgroundColor: '#00b5ad'
    }
    return (
      <div className={Classes.NavBar}>
        <Segment basic inverted className={Classes.Segement}>
          <Menu size='small' secondary inverted style={{ segmentStyle }}>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Item
              name='messages'
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Menu.Item name='Logout' onClick={this.handleItemClick} />
            </Menu.Menu>
          </Menu>
        </Segment >
      </div>
    );
  }
}

export default NavBar;
