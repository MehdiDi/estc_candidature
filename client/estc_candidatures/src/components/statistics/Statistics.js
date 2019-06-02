import React, { Component } from 'react';
import Candidats from "./Candidats";
import { Grid, Icon } from "semantic-ui-react";
import classes from './Statistics.module.css';
import Radium from 'radium';
import EtudiantStatistics from "./EtudiantStatistics";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import PreselectionStatistics from "./PreselectionStatistics";


import MoyStatistics from "./MoyStatistics";
import { isNull } from 'util';
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';

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
        const updatedClasses = [classes.FontSize, classes.Active]
        const { activeItem } = this.state;
        let categoryStatistics;
        var styles = {
            backgroundColor: '#FFF',
            minHeight: '100%',
            minWidth: '100%',
            marginTop: '-1rem',
        };

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
                <Grid stretched style={{
                    marginTop: 0,
                    backgroundColor: '#FFF'
                }}>
                    <Grid.Column width={3} style={{
                        minHeight: '100vh'
                    }}>
                        <Menu vertical compact style={styles}>
                            <Menu.Item
                                className={classes.FontSize}
                                name='Candidats'
                                className={activeItem === 'Candidats' ? updatedClasses : updatedClasses[0]}
                                onClick={this.handleItemClick} />
                            <Menu.Item
                                className={classes.FontSize}
                                name='Préselection'
                                className={activeItem === 'Préselection' ? updatedClasses : updatedClasses[0]}
                                onClick={this.handleItemClick} />
                            <Menu.Item
                                className={
                                    classes.FontSize
                                }
                                className={activeItem === 'Aprés Selection' ? updatedClasses : updatedClasses[0]}
                                name='Aprés Selection'
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                className={classes.FontSize}
                                name='Notes'
                                className={activeItem === 'Notes' ? updatedClasses : updatedClasses[0]}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column width={13} style={{
                        backgroundColor: '#FFF'
                    }}>
                        {categoryStatistics}
                    </Grid.Column>
                </Grid>
            </React.Fragment >
        );
    }
}
export default Radium(Statistics);