import React, { Component } from 'react';
import Candidats from "./Candidats";

import { Grid } from "semantic-ui-react";
import classes from './Statistics.module.css';
import Radium from 'radium';
import EtudiantStatistics from "./EtudiantStatistics";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import PreselectionStatistics from "./PreselectionStatistics";
import MoyStatistics from "./MoyStatistics";
import NavBar from '../layout/NavBar';
import Rapport from './Rapport'


class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {

            activeItem: 'Candidats',
            show: false,
        }
    };
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
            categoryStatistics = <PreselectionStatistics />;
        else if (activeItem === 'Aprés Selection')
            categoryStatistics = <EtudiantStatistics />;
        else if (activeItem === 'Notes')
            categoryStatistics = <MoyStatistics />;
        else if (activeItem === 'Rapport')
            categoryStatistics = <Rapport />;
        return (
            <React.Fragment>
                <NavBar />
                <Grid stackable stretched style={{
                    marginTop: 0,
                    backgroundColor: '#FFF'
                }}>
                    <Grid.Column width={3} >
                        <Menu vertical compact style={styles}>
                            <Menu.Item

                                name='Candidats'
                                classNames={`${activeItem === 'Candidats' ? updatedClasses : updatedClasses[0]} ${classes.FontSize}`}
                                onClick={this.handleItemClick} />
                            <Menu.Item
                                name='Préselection'
                                className={`${activeItem === 'Préselection' ? updatedClasses : updatedClasses[0]} ${classes.FontSize}`}
                                onClick={this.handleItemClick} />
                            <Menu.Item
                                classNames={`${activeItem === 'Aprés Selection' ? updatedClasses : updatedClasses[0]} ${classes.FontSize}`}
                                name='Aprés Selection'
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                classNames={`${activeItem === 'Notes' ? updatedClasses : updatedClasses[0]} ${classes.FontSize}`}
                                name='Notes'
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                classNames={`${activeItem === 'Rapport' ? updatedClasses : updatedClasses[0]} ${classes.FontSize}`}
                                name='Rapport'
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