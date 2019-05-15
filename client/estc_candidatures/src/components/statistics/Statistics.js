import React, { Component } from 'react';
import Candidats from "./Candidats";
import { Grid, Segment } from "semantic-ui-react";
import EtudiantStatistics from "./EtudiantStatistics";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import PreselectionStatistics from "./PreselectionStatistics";

import NavBar from "../layout/NavBar"

import MoyStatistics from "./MoyStatistics";


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
class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'Notes'
        }
    }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    render() {
        const { activeItem } = this.state;
        let categoryStatistics;

        if (activeItem === 'Candidats')
            categoryStatistics = <Candidats />;
        else if (activeItem === 'Préselection')
            categoryStatistics = <PreselectionStatistics />
        else if (activeItem === 'Aprés Selection')
            categoryStatistics = <EtudiantStatistics />
        else if (activeItem === 'Notes')
            categoryStatistics = <MoyStatistics />;
        return (
            <NavBar leftItems={leftItems} rightItems={rightItems}  >

                <Grid>
                    <Grid.Column width={4}>

                        <Menu fluid vertical tabular>
                            <Menu.Item name='Candidats' active={activeItem === 'Candidats'} onClick={this.handleItemClick} />
                            <Menu.Item name='Préselection' active={activeItem === 'Préselection'} onClick={this.handleItemClick} />
                            <Menu.Item name='Aprés Selection' active={activeItem === 'Aprés Selection'}
                                       onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Aprés Selection'
                                active={activeItem === 'Aprés Selection'}
                                onClick={this.handleItemClick}
                              />
                              <Menu.Item
                              name='Notes'
                              active={activeItem === 'Notes'}
                              onClick={this.handleItemClick}
                              />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <Segment >
                            {categoryStatistics}
                        </Segment>
                    </Grid.Column>


                </Grid>

            </NavBar>
        );
    }
}
export default Statistics;