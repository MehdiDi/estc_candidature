import React, {Component} from 'react';
import Candidats from "./Candidats";
import StatsMenu from "../layout/StatsMenu";
import {Grid, Segment} from "semantic-ui-react";
import EtudiantStatistics from "./EtudiantStatistics";

class Statistics extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column width={2}>
                            <StatsMenu />
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Segment>
                            <Candidats />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
export default Statistics;