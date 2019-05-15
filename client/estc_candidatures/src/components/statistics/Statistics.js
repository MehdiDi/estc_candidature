import React, {Component} from 'react';
import Candidats from "./Candidats";
import StatsMenu from "../layout/StatsMenu";
import {Grid, Segment} from "semantic-ui-react";
import EtudiantStatistics from "./EtudiantStatistics";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import PreselectionStatistics from "./PreselectionStatistics";
import MoyStatistics from "./MoyStatistics";

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

        if(activeItem==='Candidats')
            categoryStatistics = <Candidats />;
        else if(activeItem === 'Préselection')
            categoryStatistics = <PreselectionStatistics />;
        else if (activeItem === 'Aprés Selection')
            categoryStatistics = <EtudiantStatistics />;
        else if (activeItem === 'Notes')
            categoryStatistics = <MoyStatistics />;


        return (
                <Grid stackable>
                    <Grid.Column width={2}>

                        <Menu fluid vertical tabular>
                            <Menu.Item name='Candidats' active={activeItem === 'Candidats'} onClick={this.handleItemClick} />
                            <Menu.Item name='Préselection' active={activeItem === 'Préselection'} onClick={this.handleItemClick} />
                            <Menu.Item name='Aprés Selection' active={activeItem === 'Aprés Selection'}
                                       onClick={this.handleItemClick}
                            />
                            <Menu.Item
                              name='Notes'
                              active={activeItem === 'Notes'}
                              onClick={this.handleItemClick}
                            />

                        </Menu>
                    </Grid.Column>

                        <Grid.Column width={14} >
                            <Segment >
                                { categoryStatistics }
                            </Segment>
                        </Grid.Column>

                </Grid>
        );
    }
}
export default Statistics;