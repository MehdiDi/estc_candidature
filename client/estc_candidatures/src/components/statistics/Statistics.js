import React, { Component } from 'react';
import Candidats from "./Candidats";
import { Grid } from "semantic-ui-react";
import classes from './Statistics.module.css';
import EtudiantStatistics from "./EtudiantStatistics";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import PreselectionStatistics from "./PreselectionStatistics";

import NavBar from "../layout/NavBar"

import MoyStatistics from "./MoyStatistics";

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'Candidats'
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
            <React.Fragment>
                <NavBar />
                <Grid style={{
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: '#00b5ad'
                }}>
                    <Grid.Column width={2} style={{
                        overFlow: 'hidden',
                        minHeight: '100vh'
                    }}>
                        <Menu vertical inverted style={{
                            backgroundColor: '#00b5ad',
                            minHeight: '100vh'
                        }}>
                            <Menu.Item
                                className={classes.FontSize}
                                name='Candidats'
                                active={activeItem === 'Candidats'}
                                onClick={this.handleItemClick} />
                            <Menu.Item
                                className={classes.FontSize}
                                name='Préselection'
                                active={activeItem === 'Préselection'}
                                onClick={this.handleItemClick} />
                            <Menu.Item
                                className={
                                    classes.FontSize
                                }
                                active={activeItem === 'Aprés Selection'}
                                name='Aprés Selection'
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                className={classes.FontSize}
                                name='Notes'
                                active={activeItem === 'Notes'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column width={14} style={{
                        backgroundColor: '#FFF'
                    }}>
                        {categoryStatistics}
                    </Grid.Column>
                </Grid>
            </React.Fragment >
        );
    }
}
export default Statistics;