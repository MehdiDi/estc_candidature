import React, { Component } from 'react';
import { Grid, Segment } from "semantic-ui-react";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import MachineLearning from './MachineLearning/MachineLearning';

import NavBar from "../layout/NavBar"


const leftItems = [
    { as: "a", content: "Home", key: "home" },
    { as: "a", content: "Users", key: "users" }
];
const rightItems = [
    { as: "a", content: "Login", key: "login" },
    { as: "a", content: "Register", key: "register" }
];
class MachineLearnings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'Machine Learning'
        }
    }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    render() {
        const { activeItem } = this.state;
        let categoryStatistics;

        if (activeItem === 'Machine Learning')
            categoryStatistics = <MachineLearning />;
        return (
            <React.Fragment>
                <Grid>
                    <Grid.Column width={3}>
                        <Menu fluid vertical tabular>
                            <Menu.Item
                                name='Machine Learning'
                                active={activeItem === 'Machine Learning'}
                                onClick={this.handleItemClick} />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Segment >
                            {categoryStatistics}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}
export default MachineLearnings;