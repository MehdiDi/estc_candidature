import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleHeaderVertical extends Component {
  handleItemClick = name => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state || {};

    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Candidats</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='Personnalisé'
              active={activeItem === 'Personnalisé'}
              onClick={this.handleItemClick}
            />

          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Etudiants</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='Modules'
              active={activeItem === 'Modules'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Element Module'
              active={activeItem === 'Element Module'}
              onClick={this.handleItemClick}
            />

          </Menu.Menu>
        </Menu.Item>

      </Menu>
    )
  }
}